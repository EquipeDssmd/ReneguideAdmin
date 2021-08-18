export default function ({route, redirect}) {
  if(route.path !== '/login'){
  	if(!$fire.auth.currentUser){
      return redirect('/login')
  	}
  } else if (route.path ==='/login') {
  	if($fire.auth.currentUser){
  	  return redirect('/')
  	}
  }
}