async function login(event) {
    try {
        event.preventDefault()
        const loginDetails={
            email:event.target.email.value,
            password:event.target.password.value
        }    
        const response=await axios.post("http://localhost:3000/user/login",loginDetails)
        if (response.status===201) {
            alert(response.data.message)
        } 
    } catch (error) {
        console.log(error)
    }
}