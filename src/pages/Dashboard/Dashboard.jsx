import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { getMonthlyExpenses, getMonthlyIncome } from "../../services/api";
import { numberWithCommas } from "../../utils/Helper";
import { Select, Button } from "antd";

const { Option } = Select;
const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function Dashboard() {
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [monthlyExpenseData, setMonthlyExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(2024);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchMonthlyData(year);
  }, [year]);

  const fetchMonthlyData = (selectedYear) => {
    setLoading(true);
    const incomePromises = [];
    const expensePromises = [];

    for (let month = 1; month <= 12; month++) {
      incomePromises.push(getMonthlyIncome(month, selectedYear));
      expensePromises.push(getMonthlyExpenses(month, selectedYear));
    }

    Promise.all(incomePromises)
      .then((incomeResponses) => {
        const incomeData = incomeResponses.map((response, index) => ({
          month: index + 1,
          income: response.data.monthly_income,
        }));
        setMonthlyIncomeData(incomeData);

        const totalIncome = incomeData.reduce(
          (acc, curr) => acc + curr.income,
          0
        );
        setTotalIncome(totalIncome);
      })
      .catch((error) => {
        console.error("Error fetching monthly income data: ", error);
        throw new Error(error);
      });

    Promise.all(expensePromises)
      .then((expenseResponses) => {
        const expenseData = expenseResponses.map((response, index) => ({
          month: index + 1,
          expense: response.data.monthly_expense,
        }));
        setMonthlyExpenseData(expenseData);

        const totalExpenses = expenseData.reduce(
          (acc, curr) => acc + curr.expense,
          0
        );
        setTotalExpenses(totalExpenses);
      })
      .catch((error) => {
        console.error("Error fetching monthly expense data: ", error);
        throw new Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (canvasRef.current && monthlyIncomeData.length === 12) {
      const ctx = canvasRef.current.getContext("2d");

      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: monthlyIncomeData.map((data) => monthNames[data.month - 1]),
            datasets: [
              {
                label: "Pemasukan Tiap Bulan",
                data: monthlyIncomeData.map((data) => data.income),
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
              {
                label: "Pengeluaran Tiap Bulan",
                data: monthlyExpenseData.map((data) => data.expense),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => `Rp ${numberWithCommas(value)}`,
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) =>
                    `${context.dataset.label}: Rp ${numberWithCommas(
                      context.parsed.y
                    )}`,
                },
              },
            },
          },
        });
      }
    }
  }, [monthlyIncomeData, monthlyExpenseData]);

  const handleYearChange = (value) => {
    setYear(value);
  };

  return (
    <>
      <div className="content-section">
        <div className="header">
          <h2>Pemasukan dan Pengeluaran</h2>
          <div>
            <Select
              value={year}
              onChange={handleYearChange}
              style={{ width: 120, marginRight: 10 }}
            >
              {Array.from({ length: 10 }, (_, i) => 2024 + i).map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <canvas
              ref={canvasRef}
              width="300"
              height="150"
              style={{ maxWidth: "100%" }}
            ></canvas>
          )}
          <div className="flex flex-row w-full justify-between mt-8 items-center">
            <div className="flex flex-col">
              <h2 className="font-medium text-[16px]">
                Total Pemasukan Tahun {year}
              </h2>
              <h1 className="text-xl font-semibold text-green">
                Rp {numberWithCommas(totalIncome)}
              </h1>
            </div>
            <div className="flex flex-col">
              <h2 className="font-medium text-[16px] mt-4">
                Total Pengeluaran Tahun {year}
              </h2>
              <h1 className="text-xl font-semibold text-danger">
                Rp {numberWithCommas(totalExpenses)}
              </h1>
            </div>
            <div className="flex flex-col">
              <h2 className="font-medium text-[16px] mt-4">
                Sisa Dana Tahun {year}
              </h2>
              <h1 className="text-xl font-semibold text-primary">
                Rp {numberWithCommas(totalIncome - totalExpenses)}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
