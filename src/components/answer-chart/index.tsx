/* eslint-disable */
import { IOption } from 'interfaces'
import { useContext, useEffect, useState } from 'react'
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { SocketContext } from '../../service'
import { SocketEvent } from '../../service/socket/event'
import LoadingSpin from '../loading-spin'
import './index.css'

function AnswerChart({ options }: { options: IOption[] }) {
    console.log('options - answerChart', options)
    console.log('option length - answerChart', options.length > 0)
    const [data, setData] = useState<IOption[]>(options)
    const socket = useContext(SocketContext)

    const handleUpdateResults = (results: IOption[]) => {
        setData(results)
    }

    useEffect(() => {
        // Get initial results of slide
    }, [])

    useEffect(() => {
        socket.on(SocketEvent.UPDATE_RESULTS, handleUpdateResults)

        return () => {
            // before the component is destroyed
            // unbind all event handlers used in this component
            socket.removeAllListeners()
        }
    }, [socket])

    return (
        <ResponsiveContainer width="80%" height="100%" key={Math.random()}>
            <BarChart
                data={options}
                margin={{ top: 20 }}
                // className="bar-chart"
            >
                <Bar dataKey="votes" fill="#82ca9d">
                    <LabelList
                        dataKey="votes"
                        position="top"
                        style={{ fontSize: '1.5em', fontWeight: 'bold' }}
                    />
                </Bar>
                <XAxis dataKey="answer" />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default AnswerChart
