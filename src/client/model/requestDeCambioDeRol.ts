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
import { Rol } from './rol';


/**
 * Seleccionado un usuario, se pasan los roles que se le quiere asignar
 */
export interface RequestDeCambioDeRol { 
    /**
     * Id del usuario
     */
    idUser: number;
    /**
     * Roles que se le quiere asignar al usuario
     */
    roles: Array<Rol>;
}
