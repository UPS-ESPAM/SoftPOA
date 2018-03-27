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
        public virtual DbSet<Acciones> Acciones { get; set; }
        public virtual DbSet<Estrategias> Estrategias { get; set; }
        public virtual DbSet<Evidencias> Evidencias { get; set; }
        public virtual DbSet<Indicadores> Indicadores { get; set; }
        public virtual DbSet<Metas> Metas { get; set; }
        public virtual DbSet<Planificacion> Planificacion { get; set; }
        public virtual DbSet<Presupuesto> Presupuesto { get; set; }
        public virtual DbSet<TipoPlanificacion> TipoPlanificacion { get; set; }
        public virtual DbSet<MetasDepartamento> MetasDepartamento { get; set; }
        public virtual DbSet<intervalo> intervalo { get; set; }
        public virtual DbSet<Periocidad> Periocidad { get; set; }
        public virtual DbSet<InformacioAdicional> InformacioAdicional { get; set; }
        public virtual DbSet<Programacion> Programacion { get; set; }
        public virtual DbSet<Subsistema> Subsistema { get; set; }
    
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
    
        public virtual ObjectResult<spMetaDetalle_Result> spMetaDetalle(Nullable<int> meta)
        {
            var metaParameter = meta.HasValue ?
                new ObjectParameter("meta", meta) :
                new ObjectParameter("meta", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetaDetalle_Result>("spMetaDetalle", metaParameter);
        }
    
        public virtual ObjectResult<spObjetivosEspecificosbyDepartamento_Result> spObjetivosEspecificosbyDepartamento(Nullable<int> department)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spObjetivosEspecificosbyDepartamento_Result>("spObjetivosEspecificosbyDepartamento", departmentParameter);
        }
    
        public virtual int spEstrategiasInsert(Nullable<int> objetivosEspecificosId, string descripcion, Nullable<int> departamentId)
        {
            var objetivosEspecificosIdParameter = objetivosEspecificosId.HasValue ?
                new ObjectParameter("ObjetivosEspecificosId", objetivosEspecificosId) :
                new ObjectParameter("ObjetivosEspecificosId", typeof(int));
    
            var descripcionParameter = descripcion != null ?
                new ObjectParameter("Descripcion", descripcion) :
                new ObjectParameter("Descripcion", typeof(string));
    
            var departamentIdParameter = departamentId.HasValue ?
                new ObjectParameter("departamentId", departamentId) :
                new ObjectParameter("departamentId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spEstrategiasInsert", objetivosEspecificosIdParameter, descripcionParameter, departamentIdParameter);
        }
    
        public virtual int spMetasInsert(Nullable<int> indicadorId, string descripcion, Nullable<int> tipoCalificacionId)
        {
            var indicadorIdParameter = indicadorId.HasValue ?
                new ObjectParameter("IndicadorId", indicadorId) :
                new ObjectParameter("IndicadorId", typeof(int));
    
            var descripcionParameter = descripcion != null ?
                new ObjectParameter("Descripcion", descripcion) :
                new ObjectParameter("Descripcion", typeof(string));
    
            var tipoCalificacionIdParameter = tipoCalificacionId.HasValue ?
                new ObjectParameter("tipoCalificacionId", tipoCalificacionId) :
                new ObjectParameter("tipoCalificacionId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spMetasInsert", indicadorIdParameter, descripcionParameter, tipoCalificacionIdParameter);
        }
    
        public virtual ObjectResult<spIndicadorDetalle_Result> spIndicadorDetalle(Nullable<int> indicadorId)
        {
            var indicadorIdParameter = indicadorId.HasValue ?
                new ObjectParameter("indicadorId", indicadorId) :
                new ObjectParameter("indicadorId", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spIndicadorDetalle_Result>("spIndicadorDetalle", indicadorIdParameter);
        }
    
        public virtual ObjectResult<string> spEvidenciasInsert(Nullable<int> programacionId, string evidencia)
        {
            var programacionIdParameter = programacionId.HasValue ?
                new ObjectParameter("programacionId", programacionId) :
                new ObjectParameter("programacionId", typeof(int));
    
            var evidenciaParameter = evidencia != null ?
                new ObjectParameter("evidencia", evidencia) :
                new ObjectParameter("evidencia", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("spEvidenciasInsert", programacionIdParameter, evidenciaParameter);
        }
    
        public virtual ObjectResult<spPlanificacionConsultar_Result> spPlanificacionConsultar()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spPlanificacionConsultar_Result>("spPlanificacionConsultar");
        }
    
        public virtual ObjectResult<spSubsistemaConsult_Result> spSubsistemaConsult()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spSubsistemaConsult_Result>("spSubsistemaConsult");
        }
    
        public virtual ObjectResult<spObjetivosEstrategicosConsult_Result> spObjetivosEstrategicosConsult(Nullable<int> subsistema)
        {
            var subsistemaParameter = subsistema.HasValue ?
                new ObjectParameter("Subsistema", subsistema) :
                new ObjectParameter("Subsistema", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spObjetivosEstrategicosConsult_Result>("spObjetivosEstrategicosConsult", subsistemaParameter);
        }
    
        public virtual ObjectResult<spObjetivosEspecificosConsult_Result> spObjetivosEspecificosConsult(Nullable<int> objetivoEstrategico)
        {
            var objetivoEstrategicoParameter = objetivoEstrategico.HasValue ?
                new ObjectParameter("ObjetivoEstrategico", objetivoEstrategico) :
                new ObjectParameter("ObjetivoEstrategico", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spObjetivosEspecificosConsult_Result>("spObjetivosEspecificosConsult", objetivoEstrategicoParameter);
        }
    
        public virtual ObjectResult<spObjetivosEspecificosPeriodoActualConsult_Result> spObjetivosEspecificosPeriodoActualConsult(Nullable<int> objetivoEspecifico)
        {
            var objetivoEspecificoParameter = objetivoEspecifico.HasValue ?
                new ObjectParameter("ObjetivoEspecifico", objetivoEspecifico) :
                new ObjectParameter("ObjetivoEspecifico", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spObjetivosEspecificosPeriodoActualConsult_Result>("spObjetivosEspecificosPeriodoActualConsult", objetivoEspecificoParameter);
        }
    
        public virtual ObjectResult<spEstrategiasPeriodoActualConsult_Result> spEstrategiasPeriodoActualConsult(Nullable<int> objetivoEspecifico)
        {
            var objetivoEspecificoParameter = objetivoEspecifico.HasValue ?
                new ObjectParameter("ObjetivoEspecifico", objetivoEspecifico) :
                new ObjectParameter("ObjetivoEspecifico", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spEstrategiasPeriodoActualConsult_Result>("spEstrategiasPeriodoActualConsult", objetivoEspecificoParameter);
        }
    
        public virtual ObjectResult<spObjetivoEspecificoDepartamentosAsignadosSelect_Result> spObjetivoEspecificoDepartamentosAsignadosSelect()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spObjetivoEspecificoDepartamentosAsignadosSelect_Result>("spObjetivoEspecificoDepartamentosAsignadosSelect");
        }
    
        public virtual ObjectResult<string> spPorcentajeCumplimiento(Nullable<int> idmeta)
        {
            var idmetaParameter = idmeta.HasValue ?
                new ObjectParameter("idmeta", idmeta) :
                new ObjectParameter("idmeta", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("spPorcentajeCumplimiento", idmetaParameter);
        }
    
        public virtual ObjectResult<spPorcentajeOEstrategico_Result> spPorcentajeOEstrategico()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spPorcentajeOEstrategico_Result>("spPorcentajeOEstrategico");
        }
    
        public virtual ObjectResult<spMetasDepartamentosAsignadosConsult_Result> spMetasDepartamentosAsignadosConsult()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetasDepartamentosAsignadosConsult_Result>("spMetasDepartamentosAsignadosConsult");
        }
    
        public virtual ObjectResult<spDepartamentoConsult_Result> spDepartamentoConsult()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spDepartamentoConsult_Result>("spDepartamentoConsult");
        }
    
        public virtual ObjectResult<spDepartamentoCorreoConsult_Result> spDepartamentoCorreoConsult(Nullable<int> idSubUnidad)
        {
            var idSubUnidadParameter = idSubUnidad.HasValue ?
                new ObjectParameter("idSubUnidad", idSubUnidad) :
                new ObjectParameter("idSubUnidad", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spDepartamentoCorreoConsult_Result>("spDepartamentoCorreoConsult", idSubUnidadParameter);
        }
    
        public virtual ObjectResult<string> POAorPEDI(string data, Nullable<int> deparmentID)
        {
            var dataParameter = data != null ?
                new ObjectParameter("data", data) :
                new ObjectParameter("data", typeof(string));
    
            var deparmentIDParameter = deparmentID.HasValue ?
                new ObjectParameter("DeparmentID", deparmentID) :
                new ObjectParameter("DeparmentID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("POAorPEDI", dataParameter, deparmentIDParameter);
        }
    
        public virtual ObjectResult<spEstrategiasbyDepartamentoandObjetivoEspecifico_Result> spEstrategiasbyDepartamentoandObjetivoEspecifico(Nullable<int> departamentoId, Nullable<int> objetivoEspecificoId, string pOAorPEDI)
        {
            var departamentoIdParameter = departamentoId.HasValue ?
                new ObjectParameter("DepartamentoId", departamentoId) :
                new ObjectParameter("DepartamentoId", typeof(int));
    
            var objetivoEspecificoIdParameter = objetivoEspecificoId.HasValue ?
                new ObjectParameter("ObjetivoEspecificoId", objetivoEspecificoId) :
                new ObjectParameter("ObjetivoEspecificoId", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spEstrategiasbyDepartamentoandObjetivoEspecifico_Result>("spEstrategiasbyDepartamentoandObjetivoEspecifico", departamentoIdParameter, objetivoEspecificoIdParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spEstrategiasDepartment_Result> spEstrategiasDepartment(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spEstrategiasDepartment_Result>("spEstrategiasDepartment", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spIndicadoresDepartment_Result> spIndicadoresDepartment(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spIndicadoresDepartment_Result>("spIndicadoresDepartment", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spObjetivosEspecificosbyDepartamentoPEDI_Result> spObjetivosEspecificosbyDepartamentoPEDI()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spObjetivosEspecificosbyDepartamentoPEDI_Result>("spObjetivosEspecificosbyDepartamentoPEDI");
        }
    
        public virtual ObjectResult<spEstrategiasbyDepartamentoandObjetivoEspecificoPEDI_Result> spEstrategiasbyDepartamentoandObjetivoEspecificoPEDI(Nullable<int> departamentoId, Nullable<int> objetivoEspecificoId, string pOAorPEDI)
        {
            var departamentoIdParameter = departamentoId.HasValue ?
                new ObjectParameter("DepartamentoId", departamentoId) :
                new ObjectParameter("DepartamentoId", typeof(int));
    
            var objetivoEspecificoIdParameter = objetivoEspecificoId.HasValue ?
                new ObjectParameter("ObjetivoEspecificoId", objetivoEspecificoId) :
                new ObjectParameter("ObjetivoEspecificoId", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spEstrategiasbyDepartamentoandObjetivoEspecificoPEDI_Result>("spEstrategiasbyDepartamentoandObjetivoEspecificoPEDI", departamentoIdParameter, objetivoEspecificoIdParameter, pOAorPEDIParameter);
        }
    
        public virtual int spEstrategiasInsertPEDI(Nullable<int> objetivosEspecificosId, string descripcion)
        {
            var objetivosEspecificosIdParameter = objetivosEspecificosId.HasValue ?
                new ObjectParameter("ObjetivosEspecificosId", objetivosEspecificosId) :
                new ObjectParameter("ObjetivosEspecificosId", typeof(int));
    
            var descripcionParameter = descripcion != null ?
                new ObjectParameter("Descripcion", descripcion) :
                new ObjectParameter("Descripcion", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("spEstrategiasInsertPEDI", objetivosEspecificosIdParameter, descripcionParameter);
        }
    
        public virtual ObjectResult<spMetasDepartment_Result> spMetasDepartment(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetasDepartment_Result>("spMetasDepartment", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spMetasDepartmentPEDI_Result> spMetasDepartmentPEDI(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetasDepartmentPEDI_Result>("spMetasDepartmentPEDI", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spMetaAndProgramaciones_Result> spMetaAndProgramaciones(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetaAndProgramaciones_Result>("spMetaAndProgramaciones", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spMetaAndEjecucion_Result> spMetaAndEjecucion(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetaAndEjecucion_Result>("spMetaAndEjecucion", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spMetaAndProgramacionesPEDI_Result> spMetaAndProgramacionesPEDI(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetaAndProgramacionesPEDI_Result>("spMetaAndProgramacionesPEDI", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<spShowPlanificacionEjecucion_Result> spShowPlanificacionEjecucion()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spShowPlanificacionEjecucion_Result>("spShowPlanificacionEjecucion");
        }
    
        public virtual ObjectResult<spShowPlanificacionEjecucionPEDI_Result> spShowPlanificacionEjecucionPEDI()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spShowPlanificacionEjecucionPEDI_Result>("spShowPlanificacionEjecucionPEDI");
        }
    
        public virtual ObjectResult<Nullable<int>> spCountPlanificacionEjecucionPEDI()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Nullable<int>>("spCountPlanificacionEjecucionPEDI");
        }
    
        public virtual ObjectResult<spMetaAndEjecucionPEDI_Result> spMetaAndEjecucionPEDI(Nullable<int> department, string pOAorPEDI)
        {
            var departmentParameter = department.HasValue ?
                new ObjectParameter("department", department) :
                new ObjectParameter("department", typeof(int));
    
            var pOAorPEDIParameter = pOAorPEDI != null ?
                new ObjectParameter("POAorPEDI", pOAorPEDI) :
                new ObjectParameter("POAorPEDI", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spMetaAndEjecucionPEDI_Result>("spMetaAndEjecucionPEDI", departmentParameter, pOAorPEDIParameter);
        }
    
        public virtual ObjectResult<string> spCountPlanificacionEjecucion()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<string>("spCountPlanificacionEjecucion");
        }
    
        public virtual ObjectResult<spSelectPeriodos_Result> spSelectPeriodos()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<spSelectPeriodos_Result>("spSelectPeriodos");
        }
    }
}
