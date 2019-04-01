import JwtDecode from 'jwt-decode'

export default class User{
  static from(token){
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (e) {
      return null
    }
  }
  constructor({numero_celular,password}){
    this.numero_celular = numero_celular
    this.password = password
  }
}
