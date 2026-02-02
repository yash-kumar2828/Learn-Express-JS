export default function login(){
    return(`
         <form action="/submit" method="POST">
            <input type="text" name="username" placeholder="Username" required/>
            <br/> <br/>
            <input type="password" name="password" placeholder="Password" required/>
            <br/> <br/>
            <button type="submit">Login</button>    
        
        </form>`)
}