function RouterInit() {
    function Router(){
        this.routes = {};
        this.currentUrl = '';
        this.state = {};
    }
    Router.prototype.rote = function(path,callback){
        this.routes[path] = callback || function(){}
    };
    Router.prototype.refresh = function(){
        this.currentUrl = decodeURI(location.hash.slice(1))
        if(this.currentUrl&&this.routes[this.currentUrl]&&this.currentUrl != "/"){
            this.routes[this.currentUrl]();
        }
    }
    Router.prototype.init = function(){
        window.addEventListener("load",this.refresh.bind(this),false)
        window.addEventListener("hashchange",this.refresh.bind(this),false)
    }
    window.Router = new Router();
    window.Router.init();
}
export default RouterInit