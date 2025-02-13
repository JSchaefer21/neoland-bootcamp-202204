import { validateJwt} from '../validators'
import Apicaller from '../vendor/Apicaller'

function retrieveNotes(token, callback) {  // recuperar
    
    validateJwt(token)

    const api = new Apicaller(process.env.REACT_APP_API_URL)

    api.get('/notes', {
        headers: { 'Authorization': `Bearer ${token}`}}, (error, {status, payload}) => {

            if (error) {
                callback(error)
                return
            }
            if (status === 200) {
                const data = JSON.parse(payload)
                const notes = data.notes
                callback(null, notes)
            } 
            else if (status >= 400 && status < 500) { 
                const data = JSON.parse(payload)
                callback(new Error(data.error)) 
            } 
            else {
                callback(new Error('server error'))
            }
        }
    )
}

export default retrieveNotes