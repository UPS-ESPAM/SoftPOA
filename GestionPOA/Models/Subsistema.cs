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
    
    public partial class Subsistema
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Subsistema()
        {
            this.ObjetivosEstrategicos = new HashSet<ObjetivosEstrategicos>();
        }
    
        public int SubsistemaId { get; set; }
        public string Descripcion { get; set; }
        public Nullable<bool> eliminado { get; set; }
        public int idperiodo { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ObjetivosEstrategicos> ObjetivosEstrategicos { get; set; }
        public virtual periodo periodo { get; set; }
    }
}
