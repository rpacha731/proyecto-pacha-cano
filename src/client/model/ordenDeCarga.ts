/**
 * Sistema de gestión de órdenes de carga de gas líquido - IW3
 * API para gestionar órdenes de carga de gas líquido. Esto serealiza creando una orden de carga, adjuntando datos como el preset, tara, etc,a la orden de carga. Finalmente se cierra la orden de carga, la cual puedeser consultada en el futuro. Cada orden de carga pasa por 4 estados: E1, E2, E3 y E4. Se utilizó una dependencia llamada Lombok que ayudó bastante a la hora de hacer getters y setters, constructores y autowired. <strong> IMPLEMENTADO POR PACHA, LEONEL Y CANO, ELIANA </strong>
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Camion } from './camion';
import { Chofer } from './chofer';
import { Cliente } from './cliente';
import { DatoDeCarga } from './datoDeCarga';
import { Producto } from './producto';


/**
 * Clase que describe a la orden de carga
 */
export interface OrdenDeCarga { 
    /**
     * Id que identifica al camión asignado a una orden
     */
    camion: Camion;
    /**
     * Caudal promedio
     */
    caudalPromedio?: number;
    /**
     * Número que identifica al chofer asignado a una orden
     */
    chofer: Chofer;
    /**
     * Número que identifica al cliente de una orden
     */
    cliente: Cliente;
    /**
     * Código externo de la orden de carga
     */
    codigoExterno: string;
    /**
     * Densidad promedio
     */
    densidadPromedio?: number;
    /**
     * Estado actual de la orden
     */
    estado: OrdenDeCarga.EstadoEnum;
    /**
     * Fecha y hora en el que se finaliza la carga de datos
     */
    fechaHoraFinCarga: Date;
    /**
     * Fecha y hora en el que se inicia la carga de datos
     */
    fechaHoraInicioCarga: Date;
    /**
     * Fecha y hora en el que se carga el peso final
     */
    fechaHoraPesoFinal: Date;
    /**
     * Fecha y hora en el que se carga el peso inicial
     */
    fechaHoraPesoInicial: Date;
    /**
     * Fecha y hora en la que se crea la orden
     */
    fechaHoraRecepcion: Date;
    /**
     * Fecha de carga prevista
     */
    fechaHoraTurno: Date;
    /**
     * Precio del producto
     */
    frecuencia: OrdenDeCarga.FrecuenciaEnum;
    id?: number;
    /**
     * Masa acumulada total al cerrar la carga
     */
    masaAcumuladaTotal?: number;
    /**
     * Número que identifica a cada orden
     */
    numeroOrden: number;
    /**
     * Contraseña para activar la bomba y el caudalímetro
     */
    password: number;
    /**
     * Peso final del camión
     */
    pesoFinal: number;
    /**
     * Peso inicial del camión (tara)
     */
    pesoInicial: number;
    /**
     * Peso al que debe llegar el camión para cerrar la orden
     */
    preset: number;
    /**
     * Número que identifica al producto de una orden
     */
    producto: Producto;
    /**
     * Lista de los registros de datos de carga
     */
    registroDatosCarga?: Array<DatoDeCarga>;
    /**
     * Temperatura promedio
     */
    temperaturaPromedio?: number;
}
export namespace OrdenDeCarga {
    export type EstadoEnum = 'E1' | 'E2' | 'E3' | 'E4';
    export const EstadoEnum = {
        E1: 'E1' as EstadoEnum,
        E2: 'E2' as EstadoEnum,
        E3: 'E3' as EstadoEnum,
        E4: 'E4' as EstadoEnum
    };
    export type FrecuenciaEnum = 1 | 2 | 5 | 10 | 15;
    export const FrecuenciaEnum = {
        NUMBER_1: 1 as FrecuenciaEnum,
        NUMBER_2: 2 as FrecuenciaEnum,
        NUMBER_5: 5 as FrecuenciaEnum,
        NUMBER_10: 10 as FrecuenciaEnum,
        NUMBER_15: 15 as FrecuenciaEnum
    };
}
