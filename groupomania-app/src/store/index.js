import { createStore } from "vuex";
import auth from './auth';
import post from './post'

export default createStore({
    modules: {auth, post
    }
})