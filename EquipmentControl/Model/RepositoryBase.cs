using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace EquipmentControl.Model
{
    public abstract class RepositoryBase
    {
        protected readonly string ConnectionString;

        protected RepositoryBase(IConfiguration configuration)
        {
            ConnectionString = configuration["connectionString"];
        }

        protected abstract SqlConnection CreateNewConnection();
    }
}
