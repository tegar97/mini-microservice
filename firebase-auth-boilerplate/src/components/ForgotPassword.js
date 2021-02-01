import React,{useRef,useState} from 'react'
import {Form,Button,Card,Alert} from 'react-bootstrap'
import {useAuth} from './../contexts/AuthContexts'

function ForgotPassword() {
    const emailRef = useRef()
    const [error,setError] = useState('')
    const [loading,setLoading] = useState('')
    const [message,setMessage] = useState('')
    const {resetPassword} = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
       
        
        try {
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for futhere instuctions')
        } catch (error) {
            setError('Failed to Forgot Password')
        }
        setLoading(false)
    }
    return (
        <Card>
            <Card.Body>
                <h2 className="mb-4 text-center">FORGOT PASSWORD</h2>
                {
                    error && <Alert variant="danger">{error}</Alert>
                }
                {
                    message && <Alert variant="success">{message}</Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>
                 
                    <Button className="w-100" type="submit" disabled={loading}>SUBMIT </Button>
                </Form>
              
            </Card.Body>
        </Card>
    )
}

export default ForgotPassword
