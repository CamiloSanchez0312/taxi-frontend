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
  constructor(obj){
    this.numero_celular = obj.userExistent
  }
}
