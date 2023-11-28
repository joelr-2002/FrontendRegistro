import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart({ data }) {
    const labels = data.map((item) => item.NOMBRE);
    const areaPersonalData = data.map((item) => item.AREA_PERSONAL);
    const areaProfesionalData = data.map((item) => item.AREA_PROFESIONAL);
    const areaAcademicaData = data.map((item) => item.AREA_ACADEMICA);

    const barChartData = {
        labels: labels,
        datasets: [
            {
                label: 'Área Personal',
                data: areaPersonalData,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1
            },
            {
                label: 'Área Profesional',
                data: areaProfesionalData,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            },
            {
                label: 'Área Académica',
                data: areaAcademicaData,
                backgroundColor: 'rgba(255,206,86,0.2)',
                borderColor: 'rgba(255,206,86,1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true,
                max: 100,
                min: 0
            }
        },
        responsive: true,
    };

    return <Bar data={barChartData} options={options} />;
}
