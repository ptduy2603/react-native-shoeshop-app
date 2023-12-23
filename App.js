import Navigators from './src/navigators';
import { Provider } from 'react-redux' 
import store from './src/redux/store'
import 'react-native-gesture-handler'
import { RootSiblingParent  }  from 'react-native-root-siblings'

export default function App() {
    return (
       <Provider store={store}>
            <RootSiblingParent>
                <Navigators />
            </RootSiblingParent>
        </Provider>      

    )
}
