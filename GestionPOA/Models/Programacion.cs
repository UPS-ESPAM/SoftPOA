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
    
    public partial class Programacion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Programacion()
        {
            this.Evidencias = new HashSet<Evidencias>();
        }
    
        public int id { get; set; }
        public string observacion { get; set; }
        public Nullable<int> planificado { get; set; }
        public Nullable<int> ejecutado { get; set; }
        public Nullable<int> IntervaloId { get; set; }
        public Nullable<int> MetaID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Evidencias> Evidencias { get; set; }
        public virtual intervalo intervalo { get; set; }
        public virtual Metas Metas { get; set; }
    }
}