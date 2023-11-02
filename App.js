import Navigators from './src/navigators';
import { Provider } from 'react-redux' 
import store from './src/redux/store'

export default function App() {
    return (
       <Provider store={store}>
            <Navigators />
        </Provider>      

    )
}
