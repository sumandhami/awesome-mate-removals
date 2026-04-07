import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Main2 from "../Main/Main2";
import Main3 from "../Main/Main3";
import Home1 from "../PageViews/Home1/Home1";
import Home2 from "../PageViews/Home2/Home2";
import Home3 from "../PageViews/Home3/Home3";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import ProjectDetails from "../PageViews/InnerPage/ProjectDetails/ProjectDetails";
import BlogDetails from "../PageViews/InnerPage/BlogDetails/BlogDetails";
import ProjectInner from "../PageViews/InnerPage/ProjectInner/ProjectInner";
import PricingInner from "../PageViews/InnerPage/PricingInner/PricingInner";
import TeamInner from "../PageViews/InnerPage/TeamInner/TeamInner";
import ServiceDetails from "../PageViews/InnerPage/ServiceDetails/ServiceDetails";
import BlogList from "../PageViews/InnerPage/BlogList/BlogList";
import AboutInner from "../PageViews/InnerPage/AboutInner/AboutInner";
import ServiceInner from "../PageViews/InnerPage/ServiceInner/ServiceInner";
import BlogGrid from "../PageViews/InnerPage/BlogGrid/BlogGrid";
import TestimonialInner from "../PageViews/InnerPage/TestimonialInner/TestimonialInner";
import ContactInner from "../PageViews/InnerPage/ContactInner/ContactInner";
import AppointmentInner from "../PageViews/InnerPage/Appointment/AppointmentInner";
import ServiceDetails5 from "../PageViews/InnerPage/ServiceDetails/ServiceDetails5";
import ServiceDetails4 from "../PageViews/InnerPage/ServiceDetails/ServiceDetails4";
import ServiceDetails6 from "../PageViews/InnerPage/ServiceDetails/ServiceDetails6";
import ServiceDetails3 from "../PageViews/InnerPage/ServiceDetails/ServiceDetails3";
import ServiceDetails2 from "../PageViews/InnerPage/ServiceDetails/ServiceDetails2";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home1 />,
      },
    ],
  },
  {
    errorElement: <ErrorPage />,
    element: <Main2 />,
    children: [
      {
        path: "/home2",
        element: <Home2 />,
      },
      {
        path: "/project",
        element: <ProjectInner />,
      },
      {
        path: "/about",
        element: <AboutInner />,
      },
      {
        path: "/service",
        element: <ServiceInner />,
      },
      {
        path: "/service_details",
        element: <ServiceDetails />,
      },
      {
        path: "/service_details2",
        element: <ServiceDetails2 />,
      },
      {
        path: "/service_details3",
        element: <ServiceDetails3 />,
      },
      {
        path: "/service_details4",
        element: <ServiceDetails4 />,
      },
      {
        path: "/service_details5",
        element: <ServiceDetails5 />,
      },
      {
        path: "/service_details6",
        element: <ServiceDetails6 />,
      },
      {
        path: "/pricing_inner",
        element: <PricingInner />,
      },
      {
        path: "/project_details",
        element: <ProjectDetails />,
      },
      {
        path: "/team_inner",
        element: <TeamInner />,
      },
      {
        path: "/testimonial",
        element: <TestimonialInner />,
      },
      {
        path: "/appointment",
        element: <AppointmentInner />,
      },
      {
        path: "/blog_grid",
        element: <BlogGrid />,
      },
      {
        path: "/blog_list",
        element: <BlogList />,
      },
      {
        path: "/blog_details",
        element: <BlogDetails />,
      },

      {
        path: "/contact",
        element: <ContactInner />,
      },
    ],
  },
  {
    errorElement: <ErrorPage />,
    element: <Main3 />,
    children: [
      {
        path: "/home3",
        element: <Home3 />,
      },
    ],
  },
]);

export default router;

