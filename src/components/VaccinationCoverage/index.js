import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {data} = props
  const updatedList = data.map(each => ({
    dose1: each.dose_1,
    dose2: each.dose_2,
    vaccinationDate: each.vaccine_date,
  }))

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="chart-cont">
      <h1 className="hdg"> Vaccination Coverage </h1>

      <ResponsiveContainer width="80%" height={500}>
        <BarChart
          data={updatedList}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccinationDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="Dose1" fill="#f54394" barSize="20%" />
          <Bar dataKey="dose2" name="Dose2" fill="#5a8dee" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
