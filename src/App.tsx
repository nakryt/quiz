import React from "react"
import Quiz from "./Components/Quiz/Quiz"
import store from "./store/store"
import {Provider} from "react-redux"
import Layout from "./Components/hoc/Layout/Layout";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Authentication from "./Components/Authentication/Authentication";
import QuizCreator from "./Components/QuizCreator/QuizCreateContainer";
import QuizList from "./Components/QuizList/QuizList";

const App: React.FC = (): React.ReactElement => {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <Layout>
                    <Switch>
                        <Route exact path='/' component={QuizList}/>
                        <Route path='/login' component={Authentication}/>
                        <Route path='/quiz-creator' component={QuizCreator}/>
                        <Route path='/quiz/:id' component={Quiz}/>
                        <Redirect to='/'/>
                    </Switch>
                </Layout>
            </Provider>
        </BrowserRouter>
    )
}

const AppContainer = () => {
    return <App/>
}

export default AppContainer

