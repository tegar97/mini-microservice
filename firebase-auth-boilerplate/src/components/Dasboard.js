import React,{useState} from 'react'
import { Card ,Button ,Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContexts'

function Dasboard() {
    const [error,setError] = useState('')
    const {currentUser,logout} = useAuth()
    const history = useHistory()
    const handleLogout = async() => {
        setError('')

        try {
            
            await logout()

            history.push('/login')
        } catch (error) {
            setError("failed to logout")
        }
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center">PROFILE</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email : {currentUser.email}</strong>
                    <Link to="/update-profile" className=""></Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variat="link" onClick={handleLogout}>Log Out</Button>
          </div>
        </>
    )
}

export default Dasboard
