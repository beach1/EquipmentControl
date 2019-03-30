using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentControl.Model
{
    public interface IEquipmentLogic
    {
        List<RoomModel> GetHierarchy();
        List<EquipmentModel> GetEquipment(List<int> listOfId);
        void DeleteUnit(Guid id);
        void ChangeUnit(EquipmentModel equipment);
        void AddUnit(AddUnitModel equipment);
        bool CheckEquipment(int id);
    }
}
