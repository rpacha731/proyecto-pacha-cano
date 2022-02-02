export class CrearOrdenRequest {
    numeroOrden: number
    codigoExterno: string
    fechaHoraTurno: Date
    preset: number
    camion: Camion
    chofer: Chofer
    cliente: Cliente
    producto: Producto
}

export class Camion {
    cisternado: number
    descripcion: string
    codigoExterno: string
    patente: string
    constructor ( cisternado: number, descripcion: string, codigoExterno: string, patente: string ) {
        this.cisternado = cisternado
        this.descripcion = descripcion
        this.codigoExterno = codigoExterno
        this.patente = patente
    }
}

export class Chofer {
    nombre: string
    apellido: string
    dni: number
    codigoExterno: string
    constructor ( nombre: string, apellido: string, dni: number, codigoExterno: string ) {
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.codigoExterno = codigoExterno
    }
}

export class Cliente {
    contacto: string
    razonSocial: string
    codigoExterno: string
    constructor ( contacto: string, razonSocial: string, codigoExterno: string ) {
        this.contacto = contacto
        this.razonSocial = razonSocial
        this.codigoExterno = codigoExterno
    }
}

export class Producto {
    nombre: string
    codigoExterno: string
    descripcion: string
    constructor ( nombre: string, codigoExterno: string, descripcion: string ) {
        this.nombre = nombre
        this.codigoExterno = codigoExterno
        this.descripcion = descripcion
    }
}
