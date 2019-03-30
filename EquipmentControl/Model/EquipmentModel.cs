using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EquipmentControl.Model
{
    public class EquipmentModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Number { get; set; }
    }

    public class AddUnitModel
    {
        public string Name { get; set; }
        public int Number { get; set; }
        public int RoomId { get; set; }
    }
}
