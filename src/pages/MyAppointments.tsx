import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Appointment } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const navigate = useNavigate();
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate: string) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: {
            token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // const initPay = (order: any) => {
  //   const options = {
  //     key: import.meta.env.VITE_RAZOR_PAY_KEY_ID,
  //     amount: order.amount,
  //     currency: order.currency,
  //     name: "Appointment Payment",
  //     description: "Appointment Payment",
  //     order_id: order.id,
  //     receipt: order.receipt,
  //     handler: async (response: any) => {
  //       console.log("response", response);

  //       try {
  //         const { data } = await axios.post(
  //           backendUrl + "/api/user/verify-razorpay",
  //           {
  //             response,
  //           },
  //           {
  //             headers: {
  //               token,
  //             },
  //           }
  //         );

  //         if (data.success) {
  //           getUserAppointments();
  //           navigate("/my-appointments");
  //         }
  //       } catch (error: any) {
  //         console.log(error);
  //         toast.error(error.message);
  //       }
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  const appointmentRazorPay = async (appointmentId: string) => {
    console.log("appointmentId", appointmentId);
    toast.success("Payment Successfully Completed!!");
    // try {
    //   const { data } = await axios.post(
    //     backendUrl + "/api/user/payment-razorpay",
    //     { appointmentId },
    //     {
    //       headers: {
    //         token,
    //       },
    //     }
    //   );
    //   if (data.success) {
    //     console.log(data.order);
    //     initPay(data.order);
    //   }
    // } catch (error: any) {
    //   toast.error(error.message);
    // }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, []);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.slice(0, 7).map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt={item.docData.name}
              />
            </div>

            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 mt-1 font-medium">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && item.payment && (
                <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && (
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => appointmentRazorPay(item._id)}
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && (
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
