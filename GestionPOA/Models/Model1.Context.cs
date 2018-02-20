﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class PEDIEntities : DbContext
    {
        public PEDIEntities()
            : base("name=PEDIEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<TipoCalificacion> TipoCalificacion { get; set; }
        public virtual DbSet<Departamento> Departamento { get; set; }
        public virtual DbSet<ObjeEspecificosDepartamento> ObjeEspecificosDepartamento { get; set; }
        public virtual DbSet<ObjetivosEspecificos> ObjetivosEspecificos { get; set; }
        public virtual DbSet<ObjetivosEstrategicos> ObjetivosEstrategicos { get; set; }
        public virtual DbSet<periodo> periodo { get; set; }
        public virtual DbSet<Subsistema> Subsistema { get; set; }
        public virtual DbSet<Acciones> Acciones { get; set; }
        public virtual DbSet<Estrategias> Estrategias { get; set; }
        public virtual DbSet<Evidencias> Evidencias { get; set; }
        public virtual DbSet<Indicadores> Indicadores { get; set; }
        public virtual DbSet<InformacioAdicional> InformacioAdicional { get; set; }
        public virtual DbSet<intervalo> intervalo { get; set; }
        public virtual DbSet<Metas> Metas { get; set; }
        public virtual DbSet<Periocidad> Periocidad { get; set; }
        public virtual DbSet<Planificacion> Planificacion { get; set; }
        public virtual DbSet<Presupuesto> Presupuesto { get; set; }
        public virtual DbSet<Programacion> Programacion { get; set; }
        public virtual DbSet<TipoPlanificacion> TipoPlanificacion { get; set; }
    
        public virtual ObjectResult<spLoginIngreso_Result> spLoginIngreso(string usuario, string clave)
        {
            var usuarioParameter = usuario != null ?
                new ObjectParameter("Usuario", usuario) :
                new ObjectParameter("Usuario", typeof(string));
    
            var claveParameter = clave != null ?
                new ObjectParameter("Clave", clave) :
                new ObjectParameter("Clave", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spLoginIngreso_Result>("spLoginIngreso", usuarioParameter, claveParameter);
        }
    
        public virtual ObjectResult<spEstrategiasDepartment_Result> spEstrategiasDepartment(Nullable<int> department)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spEstrategiasDepartment_Result>("spEstrategiasDepartment", departmentParameter);
        }
    
        public virtual ObjectResult<spMetasDepartment_Result> spMetasDepartment(Nullable<int> department)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetasDepartment_Result>("spMetasDepartment", departmentParameter);
        }
    
        public virtual ObjectResult<spMetaDetalle_Result> spMetaDetalle(Nullable<int> meta)
        {
            var metaParameter = meta.HasValue ?
                new ObjectParameter("meta", meta) :
                new ObjectParameter("meta", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetaDetalle_Result>("spMetaDetalle", metaParameter);
        }
    }
}
