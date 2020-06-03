import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {
  ImageBackground,
  Platform,
} from 'react-native';
import Login from '../pages/Login';
import Home from "../pages/Home";
import Incident from "../pages/Incident";
import IncidentListing from "../pages/IncidentListing";
import IncidentDetail from "../pages/IncidentDetail";
import AddIncident from "../pages/AddIncident";

import Service from "../pages/Service";
import ServiceListing from "../pages/ServiceListing";
import ServiceDetail from "../pages/ServiceDetail";
import AddService from "../pages/AddService";

import Maintenance from "../pages/Maintenance";
import MaintenanceListing from "../pages/MaintenanceListing";
import MaintenanceDetail from "../pages/MaintenanceDetail";
import AddMaintenance from "../pages/AddMaintenance";

import AssignedListing from "../pages/AssignedListing";
import AssignedDetail from "../pages/AssignedDetail";

import PendingListing from "../pages/PendingListing";
import PendingDetail from "../pages/PendingDetail";
import NavigationBg from '../components/NavigationBg';
import ResetPass from "../pages/ResetPass";
import ResetPassCode from "../pages/ResetPassCode";
import ResetPassScreen from "../pages/ResetPassScreen";

import Profile from "../pages/Profile";

export default class Routes extends Component<{}> {
	render() {

		return(


  			<Router titleStyle={{//fontFamily: 'Arial',
          fontSize: 18,
          color: '#003300',
        }}>
  			       <Scene>
  								    <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
  								    <Scene key="login" component={Login} initial={true} />

                </Scene>

  							<Scene  key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
  								<Scene key="home" component={Home} />
  							</Scene>

                <Scene backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}}  key="resetpass" component={ResetPass} headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   title="Reset Password"   backTitle=" "/>
                <Scene backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}}  key="resetpasscode" component={ResetPassCode} headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   title="Reset Password Verfication"   backTitle=" "/>
                <Scene backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}}  key="resetpassscreen" component={ResetPassScreen} headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   title="Reset Password"   backTitle=" "/>

  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="incident" component={Incident} headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}     title="Incident Log" headerBackTitle   backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="incidentlisting"   component={IncidentListing} headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}    headerBackTitle title="Incident Listing" backTitle=" " />
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="incidentdetail" component={IncidentDetail} headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}    title="Incident Detail" backTitle=" "/>
                <Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="addIncident" component={AddIncident} headerBackTitle title="Add Incident Request" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" " />

  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="service" component={Service}  title="Service Request" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="servicelisting" component={ServiceListing}  title="Service Listing" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}    backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#0a00',tintColor : '#000'}} key="servicedetail" component={ServiceDetail}  title="Service Detail" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}    backTitle=" " />
                <Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="addService" component={AddService}  title="Add Service Request" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}    backTitle=" "/>

  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="maintenance" component={Maintenance}  title="Maintenance/Operation Request" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="maintenancelisting" component={MaintenanceListing}  title="Maintenance/Operation Listing" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="maintenancedetail" component={MaintenanceDetail}  title="Maintenance/Operation Detail" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
                <Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="addMaintenance" component={AddMaintenance}  title="Add Maintenance/Oper Request" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>

  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="assignedlisting" component={AssignedListing}  title="Assigned Tasks" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="assigneddetail" component={AssignedDetail}  title="Assigned Tasks Detail" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>

  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="pendinglisting" component={PendingListing}  title="Pending Approval List" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="pendingdetail" component={PendingDetail}  title="Pending Approval Detail" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>

  							<Scene  backButtonTintColor = '#000' leftButtonStyle = {{color : '#000',tintColor : '#000'}} key="profile" component={Profile}  title="Profile" headerForceInset={{top:Platform.OS === 'ios' ? 'never' :22}}   backTitle=" "/>
  					</Scene>
  			 </Router>

			)
	}
}
