using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace EquipmentControl.Model
{
    public class EquipmentRepository: RepositoryBase, IEquipmentRepository
    {
        private readonly string companyTable = "dbo.Company";
        private readonly string equipmentTable = "dbo.Equipment";
        private readonly string allTableFields = "SELECT *";

        public EquipmentRepository(IConfiguration configuration) : base(configuration)
        {

        }

        protected override SqlConnection CreateNewConnection()
        {
            return new SqlConnection(ConnectionString);
        }

        public List<RoomModel> GetHierarchy()
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                var sqlExpression = $@"SELECT t3.id, t1.name AS Company, t2.name as City, t3.name as Room
                                                 FROM {companyTable} AS t1
                                                 LEFT JOIN {companyTable} AS t2 ON t2.parent_id = t1.id
                                                 LEFT JOIN {companyTable} AS t3 ON t3.parent_id = t2.id
                                                 LEFT JOIN {companyTable} AS t4 ON t4.parent_id = t3.id
                                                 WHERE t1.id = 1";

                connection.Open();
                SqlCommand command = new SqlCommand($"{sqlExpression}", connection);
                SqlDataReader reader = command.ExecuteReader();
                List<RoomModel> listRooms = new List<RoomModel>();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var room = new RoomModel
                        {
                            Id = (int)reader["id"],
                            Company = (string)reader["Company"],
                            City = (string)reader["City"],
                            RoomName = (string)reader["Room"],
                        };
                        listRooms.Add(room);
                    }

                    reader.Close();
                }
                return listRooms;
            }
        }

        public List<EquipmentModel> GetEquipment(List<int> listOfId)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                var sqlExpression = $@"SELECT Id,Name,Number
                                     FROM {equipmentTable}
                                     WHERE Room_id in ({string.Join(",", listOfId)})
                                     ORDER BY Name";

                connection.Open();
                SqlCommand command = new SqlCommand($"{sqlExpression}", connection);
                SqlDataReader reader = command.ExecuteReader();
                List<EquipmentModel> listEquipment = new List<EquipmentModel>();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var equipment = new EquipmentModel
                        {
                            Id = (Guid)reader["Id"],
                            Name = (string)reader["Name"],
                            Number = (int)reader["Number"],
                        };
                        listEquipment.Add(equipment);
                    }

                    reader.Close();
                }
                return listEquipment;
            }
        }

        public bool CheckEquipment(int id)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                var sqlExpression = $@"SELECT COUNT(*)
                                     FROM {equipmentTable}
                                     WHERE Room_id = {id}";
                connection.Open();
                SqlCommand command = new SqlCommand($"{sqlExpression}", connection);
                var result = (int)command.ExecuteScalar();
                return result>0;
            }
        }

        public void DeleteUnit(Guid id)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"DELETE FROM {equipmentTable} WHERE Id=\'{id}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }

        public void ChangeUnit(EquipmentModel equipment)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"UPDATE {equipmentTable} SET Name=\'{equipment.Name}\'," +
                                       $" Number={equipment.Number} WHERE Id=\'{equipment.Id}\'";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }

        public void AddUnit(AddUnitModel equipment)
        {
            using (SqlConnection connection = CreateNewConnection())
            {
                connection.Open();
                string sqlExpression = $"INSERT INTO {equipmentTable} (Room_Id, Name,Number)" +
                                       $"VALUES ({equipment.RoomId}," +
                                       $"\'{equipment.Name}\'," +
                                       $" {equipment.Number})";
                SqlCommand command = new SqlCommand(sqlExpression, connection);
                command.ExecuteNonQuery();
            }
        }
    }
}
