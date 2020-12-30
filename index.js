import { AppRegistry} from 'react-native';
import AppWrapper from './appWrapper';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
