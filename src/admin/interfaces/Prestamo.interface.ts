export interface PrestamoDTO {
    nIdPrestamo?: number;
    nIdCliente: number;
    sClienteNombre: string;
    dFechaPrestamo: string;
    dFechaDevolucion?: string;
    sEstado: string;
    sCodigoBarras?: string;
    nPrecioVenta: string;
    nPrecioAlquiler: string,
    nIdCopia: number;
    nIdTransaccion?: number;
    nIdUsuarioCrea: number;
    success?		: boolean
	data?			: any;
}
  