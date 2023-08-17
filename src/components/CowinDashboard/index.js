import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const apiStatus = {
  successView: 'Success',
  inProgress: 'Loading',
  failureView: 'Failure',
}

class CowinDashboard extends Component {
  state = {DataList: [], pageStatus: apiStatus.inProgress}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({pageStatus: apiStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = {
        last7DayVaccination: fetchedData.last_7_days_vaccination,
        vaccinationByAge: fetchedData.vaccination_by_age,
        vaccinationByGender: fetchedData.vaccination_by_gender,
      }
      this.setState({DataList: updatedData, pageStatus: apiStatus.successView})
    } else if (response.status !== 200) {
      this.setState({pageStatus: apiStatus.failureView})
    }
  }

  renderSuccessView = () => {
    const {DataList} = this.state

    return (
      <>
        <VaccinationByCoverage data={DataList.last7DayVaccination} />
        <VaccinationByGender data={DataList.vaccinationByGender} />
        <VaccinationByAge data={DataList.vaccinationByAge} />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-info">Something went wrong</h1>
    </>
  )

  renderPageView = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case apiStatus.successView:
        return this.renderSuccessView()
      case apiStatus.inProgress:
        return this.renderLoadingView()
      case apiStatus.failureView:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-cont">
        <div className="app-hdg">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="img-logo"
          />
          <h1 className="app-name"> co-WIN </h1>
        </div>
        <h1 className="main-hdg"> CoWin Vaccination in India </h1>
        {this.renderPageView()}
      </div>
    )
  }
}

export default CowinDashboard
