//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GestionPOA.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ObjeEspecificosDepartamento
    {
        public int id { get; set; }
        public Nullable<int> DepartamentoID { get; set; }
        public Nullable<int> ObjetivosEspecificosId { get; set; }
        public Nullable<bool> eliminado { get; set; }
    
        public virtual ObjetivosEspecificos ObjetivosEspecificos { get; set; }
    }
}
