import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSideBar";

export default observer(function ActivityDetails(){

  const {activityStore} = useStore();
  const {selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
  const {id} = useParams();

  useEffect( () =>{
    if(id) loadActivity(id);
    return () => clearSelectedActivity();
  }, [id, loadActivity])

  if(loadingInitial || !activity) return <LoadingComponents/>;
 
  return (
       <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity}/>
          <ActivityDetailedInfo activity={activity}/>
          <ActivityDetailedChat activityId={activity.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar activity={activity}/>
        </Grid.Column>
       </Grid>
  )
})