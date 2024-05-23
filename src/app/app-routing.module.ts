import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMatchComponent } from './components/add-match/add-match.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { AddTeamComponent } from './components/add-team/add-team.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditMatchComponent } from './components/edit-match/edit-match.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MatchInfoComponent } from './components/match-info/match-info.component';
import { MatchesComponent } from './components/matches/matches.component';
import { PlayersComponent } from './components/players/players.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchTeamComponent } from './components/search-team/search-team.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { TeamsComponent } from './components/teams/teams.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  // http://localhost:4200 =>
  // home component will be displayed
  { path: '', component: HomeComponent },
  // http://localhost:4200/inscription =>
  // signup component will be displayed
  { path: 'inscription', component: SignupComponent },
  { path: 'signupAdmin', component: SignupComponent },
  // http://localhost:4200/connexion =>
  // login component will be displayed
  { path: 'connexion', component: LoginComponent },
  { path: 'addMatch', component: AddMatchComponent },
  { path: 'addPlayer', component: AddPlayerComponent },
  { path: 'addTeam', component: AddTeamComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'teams', component: TeamsComponent },
  // matchInfo/2 ou matchInf/7 ou matchInfo/param (:id)
  { path: 'matchInfo/:id', component: MatchInfoComponent },
  { path: 'editMatch/:id', component: EditMatchComponent },
  { path: 'searchMatches', component: SearchComponent },
  { path: 'searchTeam', component: SearchTeamComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'searchWeather', component:WeatherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
