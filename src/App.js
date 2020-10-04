import React, { useState , useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db , auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return ({
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  });
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [openSignIn , setOpenSignIn] = useState(false);
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email , setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((authUser) => {
       if(authUser)
       {
          //loggedin
          
          console.log(authUser);
          setUser(authUser);

       }
       else
       {
          //loggedout
          setUser(null);
       }
     })  
     return () =>{
       //perform cleaup
       unsubscribe();
     } 
  }, [user, username]);
 

  useEffect(() =>{
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      //asg
      setPosts(snapshot.docs.map(doc =>({
        id : doc.id,
        post: doc.data()
      })));
    })
  },[]);

  const signUp = (event) =>{
    event.preventDefault();
    

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(function(error) {
      // Handle Errors here.
     
      alert(error.message);
      // ...
    });

  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);

    


  }


  return (
    <div className="app">

      
      

      

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
          <center>
            <img
              className="app_headerImage"
              src="https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png"
              alt=""
            />
          </center>
            <Input 
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
         </form>
        
      </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
      <form className="app_signup">
          <center>
            <img
              className="app_headerImage"
              src="https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png"
              alt=""
            />
          </center>
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
         </form>
        
      </div>
      </Modal>
      
      <div className="app_header">
      <img  
        className="app_headerImage"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAACDCAMAAACz+jyXAAAAgVBMVEX///8AAAChoaH7+/v09PT39/fPz89gYGCpqanv7+/5+fnr6+u/v7+kpKSYmJjy8vLGxsawsLDg4ODZ2dm4uLh+fn6NjY0sLCyIiIh4eHhWVla7u7txcXHLy8tOTk5nZ2dHR0c+Pj4oKCgUFBQ4ODgdHR0LCwscHBxCQkIkJCRbW1uYM5q2AAATiklEQVR4nO1daWPiug5lK0uh7HtZC9NO+/9/4Ks36Uh2AvdNoJc70afWSRxbR5tlxVQqV9HzYPB03Z0l3YBeztVvOm1qo1FvOGn89HD+NhpWFc0Kf8VoPp2UGpZBfc3/anVc8CtGttf3zbTgfv8TVIv5X20W/I7VzaB9fIrszy3YtKae1wX3/PD0lOJ/4QAcuOuCe3542t8FgAV3XS+46wenbZL/1UnBr/koNSCDPtIA9Ap+TbUEIE2pCMjQqOD3cM8fBff84BTY0ho1tzMAoF3sa+rc87nYnh+c/BLs5Hzu8mYAdLjnXbE9PzYFwey4f59vBkCXe24V2/NjU19xe3crAMYMwKrYnh+bdFwyuwMAy2J7fmjqOZbMqeFmAEwYgH6xPT80fTmW8Kp3cysAmgxA0QHuA9Mgigv3twIAEn7DYnt+ZGpHNuFmAPQYgDIdTeRjHkj73AyAKQNQbosFClE/NH0Rm16KfRekXDvF9vzA5O0yLox426RWyCs6k+aw1xsOMcmxL1XA0zwOCwsFYLyupuljcT7uWqvZ/GU6/JvrL/wmFSaeiwRgnsF+RTtyQU+j1e6w27S71/XfKAa7em++/5r1tz+wTeQ5gFHJuUAAmmmGx+T8fZ3N1O/LpRNdu8n/NfpjtnH+sVX0FsglCvkxNMlFApC51RDRoCKWyoZm+cHqC924/KOtu/EJX/revqsahLURthUKQGX06wrun3etRmpjdJHDDVHHdFqmSmgG7WV/cGmA4+ith/n9likjP35sKxaAby2bLg/RJA3Xv2bz0WtzHELSbuqmzKxRjNZeL6+dA7og0Ol6kP294gLvJD+xrWgALHWHwh+/TZ6jW87VJKX3bhqpWz+E3/DrmQtpp1b6rdUro4A/pWUCADaJBECndViN/nRIWPuVWIiNMjiR3rzJ4BsUfAUXkZ/5zo4SIs2ZzGvDwm2Tz3z+wrYEAO6293+Ymqh/L8F6r72mnwooe6owLpMTqeKMZCGfIU4qBoXKB+B35lt1abLXuV2t0FV8yA5gG4+BAPj0Dden8Scv+zc1FwBgHz/AMU1Eh/juRebNxLcAQO6YJ5n9VKvKSLLTKdI/hEUX6lsCAFKK63pt8paCo41p7aj/JeVwohpFMmiu3qdPlS5UEgRLGXZWc9VWDxRJLUQYgCJ3k0LiDe17HgDXqF8q8DT9Q5QTbwlP8e5F77nSaPP/0e7BJ1/zPpptUmBP8BK5JkgMsj+uNHocCqhBbrMuRDT4B94ySMCWm6B6hwCglssATN9j9lerr5ULW8Joi/0EnwhIHchACEreZKlbSLj7k3HWYgBdybGhnjtmvTQfgIkxj+vX3HuYwrBBTxMAcNMlADrJiN+xEOztXD+HawCyT2SztM5zCMRMIg8T1jSYfP2m83r20tSRDdzDPdEU5L0MVi4AYZan6yAIwTkY5QQAHHRf8D+vafY7DYOIL7KisKyFzdEwOqUwULkEok27DephQeut6AlMGSdjxqojT7yfl/vpFne5u8ZZj+KXJQBg98l9NufLqRao7NynmR4YjmiFB4swMKBBL5TPZn+BfpIY5P9PfHJlCM0ZhAUY6gZzKN/KAORVlYn4+IoUFTGFpw2jygGgFTEgj/9rOYMoMoF3CuU4J2dMsr7A1kFo9f9nxLVYlcojOmBPATopXwkAOv1vrM4z9Llf4mWXvTHNnFkC5rgWNQUAgqdCwQEGa7KZMgh0tFeFS2LW3kWpdRu5eYmjr7EPhdcZK2sEjSVGWKZgK+WuHY8xAEBxGm/dgiQZuqIAMASYnHFJAMDusyGHiFk8MF2GDrV2PxiWlhyvC4qQOIyX5r6tB2eIoykZEnjnedAMA0NflWtA2nqS1fJBly4AAFJDqVhl91QglSKaOk0GosWAbLQIPFIDmzmR+V+49qZdDb85qQaboJML3J90kkPJU0ck2m+yky/JYa+Q/Yoo+BZaQ43Ky5+uAgA6pefVly6JFb8mkmWyvQBAGCx7lgbOTc4HBe03tbbX5zA6QEivrPiKXP/3dHeGKHZUbPNL37l41qooppwTPj7yll4zpIKx/EQKTUZJp/auKQAMmL2HBugkcJcZ7gCAmIUiepHNj3PNFaGeUs4Bc/XhhsdM5Ap5zaZgXMhBO7W1AVTGlyEsV2qkSVg0AChw0eIv3W+SCMhg8BMAsD8b8NSqPEH1WEb6BQyB2r5iTiih3qfup5ulhAYuh8jMDcgqNgVIMsgiiVBh7ijZrAAQwr6WQ8joN4MoppjgwAUj2XhYBca0wVfoBpM56RfBslOpPPcvvTNPaMnMpkBjITsJ416J/60RAO3EN5O8qrTbMbSvUJN5kC3xMACgA6/rdvjZvrR1L8GEsfHoVBT2FKDACuSQfhEMeZx1RV7ACdEVCslUjEf49p3Pd8NsikekbFBOW4bruEkMSsZMMABIYfcA6M2FrOozZaGhYvCwFrmcAADHy0aARKkViSFMMkPzsgHgl8p23KQk40QCozwc3Hs03qHJvGWb+QUPcEZDdoTrSViySwBE9taLod7UVirq6XVndmRFU+buRpgiW++J3sPgUJDbvipJAqDVClFNJJBY1VAChkyBRFEOqxFU0l5jJcccCGmyGm8iMWtIAiAL/lyYZpFbJx/ml/ptKqEETxnfaZMNY9md6FMNKHjCRXjixfIG6T6Z0dIHi7wK2el5+i1SJCue6wt1Db05eVWVm8V+4JLwAaomwAFglw/g8BO1zTR46XaeMwoSgkvk9O9W6xkDkJPqcQSyIQFgCyGtisjmUBYqnHkjFwdyDWoE3WZm96ojtMokSZIZgrcQL4soyMaO82NoOZgbrEZtAL/YB/N5PRocXCsyBXnh7yaHvg9CjAGo8B5w+vsL7kVltWsZz+GgeFGfsdMlZmAarAd3USfJnah/0uGfJ1GoBZkpAYD1Wgy6XV1s3Az44SgZCmu3CJxJqjwg9MCsmzr5WJDFBQDQYqT8/5EvyzCAjZrMP2Kkx7YgDEbFjnjzhhjm5kngoLVnVZb6iDlFdKMIgDWaewbAeEIbF+0qOQCgbiUY1IyPrAkCyQCMnDANafQAQAX2gj8T9WjHrNfTjrNK7uCAplE3SsuwUMjKfZ9voggVt1I4xpUdYYoBczkIgH32hTXL1FVZRzNEALQdgIVQutqs3ptJZxD2mzhM8pgzmCAjYn3wFmcjjnxVtLPOq9wVKiVL02eqD3EYlIt17HSdHJB2oHMie6wODkFbhu4Zo6CWGxLbzjBasV2nYj1UgJyPFBuQMwttDIAT8g2vQwAAWax2ijYjINoV7SxyaqMMsy1sJry+HFTvWOI8CsPxoyNVek09oMJ11DsEjOW3VfGT4JF7i9YXaQ/FAYgpctPUfB+5LFG/XTX2IAGAGYHAQGsg8FO0s+wqucDO6rpV7+vjzZbPRiL3iqdglTn2VeYAjQC6SrbDe6uzawlA37McFi8KANDR3ApH1oBDaNIAdFMAGNUddlBqlafnS+g4MK6VIxbrMG72DSqOE9HxMNznU28EAEyc6wey9tuqUiK4dWNZVJMAnDzDIIjKWm5eyFKzqtFKrippAcNk8TH/dRLOkIhFSwAAAbwciPAp0TxUFCoWbSZ6bwADCQBgCVoUJFGuDgAAY12+pol+/KkZGJsJAF+4UFnHmhLXZfHcgzgTACYw/VQMlXM7UrMAAG6XjhvDEQYgODklt2IdNvHjCSwgACDgZI8kMxFiGQDrsGiLuY5tnU0YfyYAtNy8kKSGNB/hr15t2oM4EwAmJHMqg8K4gCmzEcX1EG4uyMA5WlpZCgCokDXyPlN4iqSdF4DgKyWUQpWGGS+ouoU4A2AVwCIJAMjpBJt36bQ2UHxinnq3Afro/yYfYCTK27Yu5pY4+8LhBTIPC9ik04CVM6wcyDPIlYYYoBE9A18IawlKBgCWWzIkEfmPXsYLqm5JwQDYsebtPTAAl47JAIZkvPxgmoKhCgBY4MnHYa6QQjlOhCAA6OBlGBrxlF8kWgxFuVA7wDBXsk+sjzBNqUuiopGXf9EHCeaSMkt2RGBBJAC91NsSxM9vEm2GrA8J4hy2a+0cuRfMqc/xFj0IwTmRv5VZP8KWMptim1LWhD27MS+iZxg0rOAW8xcpGXaXUR37pKIzsH67mSVK7nw3JTeyCDwfB0vy1XbmJM4Vfi0uZLFKdKXYgD5AOM9DJaMHUFzihIjlZEl2xQkiPUNmlWAU6IrEiOhomW42VK9oADxr2dLKbFU31RgTdNhNNVY9y8msutFb/RKhOUYTbmgg7BzuHOOuPckELbFbz1dymLtZHXkZS36DjIJgHRozqXfkn6OqP+tKpV3yAs9OhAcw3dLILxRNg0CCb0oMijTFColLc8hahydYk9krYB3TkijT1DItFdjNeoEhrgpRommFCyR+wqKgqZBCTbYySlRaLshPZb1UsZyRAXu12ugGmX8CDYot3Cne4zwlgz9h+ZAOHpjrrPGR/id5doCTAQEIndQegkUNwTr3AV92qm+tZRmRobAZR3MS92PGx3GJggjfqutNfF5VOLAgsJyNI5e2thbLYZt/YCe6JrCM4tUTxd1fY44X5Rqjrx5iT7kXPc9Tdt0Nt0ei54aDtoYHqBQg3gwP6ZWQjpZBEySpnSq3SLxG0Uw8WTEUwJO/OIaWsEZ6cgrjUUwWrXnCyBtT58LFpUAhekczBMmckZq2v8PZ+WfSe3ipGwubHGf5sPqbXqULAuNc41h04hlKa2HY3HScbrLEW/9gNVxuw7+qCYJ568uHLfz2ootwcxIRwtDhZ1W4sAqwZn1fiDkabnWSxBGaM1ZD/wRlypl1Dqy2crpCEsNMIvuQ+ArZq3aw6UfzT08bmtDVAT9BqPu3zmXQP1ETTBUueXNjZlcHvDI/GhArT4HTInEh8wvbM70AbnGjYxu0g+sDWLiRfloWfYhn9n07jv0c++BxvxO8CTMbkHP/WYX45Lyvqi4f49AXrsj+rAKhLuIKXUtYjNA0FmSa3cg/00ZIHtoii2QRGhrsCu/fbSEkWzZ0j54loLKzp7oXKaMyZGiCG3dDNZkALd9HHdWHwXFIksh2hTe70VufMeXhBA/vMqHWQckvXcwaWsacboqwbE582mZG27e3hPDXAfaZ0gH1eZHcp0ZzwykYdn1784IxeIp1v90H1D7qiY4CWV9KD7r7HDbOIMkF2emJyy8+vxEYBvM4Y8FLFUT5N1utsZH6G3LZ22835K6SFUNbHWq5B6ANVqHRsS/kZIJiaT9Q18cqqepl4AHa11ebEKLDE+pZB4+0CLTEiTQ1iX8N/vOjQNk4DcRwoBKmDpW8CQACQ8/t0Rd1zobGaF5jh08Lz24Akqrou+XVIuax9KqB2UlDn23JEA16kVxGhx8xa1UurytUZZKS8Bb2FsVzPmTkbZBdPzCcTDkkHR2Uu2pE2l1HpFTcmSke7+9ZmCNNhjXaTRpXhouoW8xnKPVBoQVX/rmfzeerlt5urCa/ruxtzh+n06/LH4D3ZrgpedpMlcfRNXjBHE6rEXEcNlhaZryFSK8e1VIahtA/6WOORNmxt9j1+LN+yEC/uOBj5tfnaCYOdFN3vl6cNy9ZX1TiHC1l/F4S0FXfF+dRY/Ja6/f7tWkzcULAQL6MFSpSHpXKajZhHk9v6uaJMBHrfuIAszrEcm9BXiObKCtjGpMmbCMDWpc+vUAE1NZ4J6G/2fMunjoodDg2VR154RcG5N1G5icXnyeMgX2No3gq97dtOqy+F3/ksRsc/EdsT3rZh+283eFY+Tq5qLMqMMe15sVfeOhCCMiVcECJWGiy+Ub/faW+AgFt+rpwwNykNtuv1+vVNv82N8DaZt1apve/mqtqgt7mRf9wWwZNLO+iM/YqlefJ9tUObX3VSLZza9c3jqHRfJLPPCWKMie1ze50Ou3+7PTLf0jj0XJNmnBez2rbf835wZ1/cjhdI/iZSKbufQTr/0eNxsVzNR+DcC998Tpqv5ang9+VxEryigMCSiqWvp3KqQTg56hlEqfnEoCfIhO+DmHt8/vyIyUVSIb/e8yylL+Xfley67rnEoCfIpuONJkBBuCKU3pKKopsgt3mLdolAD9AdkvKJecZgOtOiSmpCLLZFJcL4mRc+Vu5d6MlGaASgJ8gtwXgU8i855h7sm1JBdLRsDvUe2YdfVnSzcjuI9O3BiUAdyebf6M9PN4QuPQRSknFkFt50b+8RVn+Xvp96JeU9k0JwH3J1Wry9iUDUPDPIJeUJlv3AQdttEoA7kqu/A/KaLieueBfYi8pSW4XHko5+APfOxQ3leRKPQ/QwFuSty7uK6kSvqbDeOetBOCe5HaAsURTf4BW0k1phnk4S9USgHuSzcOJD4IZgHuWeP61ZDmNeefnEoB70jhacTVKAO5JzgdjATR861L4z16XFFEtEnX4QOZOPwf/V9MyEnX4jvpf86XDf5j2kQbAF0oXvjMqqQDaRQH/kQH4sVH9ReTYDVk3ODTglP1YSUWRAwA2f9PHZpR0K3IAcBEoHg5QVibegdwnxXxsHB6PUW4H3IHmcsklzmbo5D5ZUiHkD5PxJy2Jkz7KzzPuQv68lNVzpd6Tp188xgfaD0/yHC2g98vPllQEJY+7qJY1KfejWRqAnx7WX0TDXwn+lxvy96TmTJ+clT6trKTbUaPZXu6PviLiq9wL+zGqNwaDf3Ua+n8ydNtxAPQ7aQAAAABJRU5ErkJggg=="
        alt=""
      />
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className="app_loginContainer">
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        <Button onClick={() => setOpen(true)}>Signup</Button>
        </div>
      )}
      </div>
      

      
     
      
        <div className="app_posts">
              <div className="app_postsLeft">
            {
              posts.map(({id , post}) => (
                <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
              ))
            }
            </div>
            <div className="app_postsRight">
            <InstagramEmbed
                url='https://instagr.am/p/Zw9o4/'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />

            </div>
      </div>

        

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />

      ):(
        <h3>Sorry! You need to login to upload</h3>
      )}

      
    </div>
  );
}

export default App;
