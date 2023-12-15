import Navigators from './src/navigators';
import { Provider } from 'react-redux' 
import store from './src/redux/store'
import 'react-native-gesture-handler'

export default function App() {
    return (
       <Provider store={store}>
            <Navigators />
        </Provider>      

    )
}
