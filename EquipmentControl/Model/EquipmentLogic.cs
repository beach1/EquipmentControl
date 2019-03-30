using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentControl.Model
{
    public class EquipmentLogic: IEquipmentLogic
    {
        private readonly IEquipmentRepository Repository;

        public EquipmentLogic(IEquipmentRepository repository)
        {
            Repository = repository;
        }

        public List<RoomModel> GetHierarchy()
        {
            return Repository.GetHierarchy();
        }

        public List<EquipmentModel> GetEquipment(List<int> listOfId)
        {
            return Repository.GetEquipment(listOfId);
        }

        public void DeleteUnit(Guid id)
        {
            Repository.DeleteUnit(id);
        }

        public void ChangeUnit(EquipmentModel equipment)
        {
            Repository.ChangeUnit(equipment);
        }

        public void AddUnit(AddUnitModel equipment)
        {
            Repository.AddUnit(equipment);
        }

        public bool CheckEquipment(int id)
        {
            return Repository.CheckEquipment(id);
        }
    }
}
