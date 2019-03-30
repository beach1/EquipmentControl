using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EquipmentControl.Model
{
    public interface IEquipmentRepository
    {
        List<RoomModel> GetHierarchy();
        List<EquipmentModel> GetEquipment(List<int> listOfId);
        void DeleteUnit(Guid id);
        void ChangeUnit(EquipmentModel equipment);
        void AddUnit(AddUnitModel equipment);
        bool CheckEquipment(int id);
    }
}
