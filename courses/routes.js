import Database from "../Database/index.js";
function CourseRoutes(app) {
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((course) => course._id === id);
        if (!course) {
          res.status(404).send("Course not found");
          return;
        }
        res.send(course);
      }
    );
    
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
       

        const index = Database.courses.findIndex((course) =>
          course._id === id
        );
        if(index === -1) {
          res.status(404).send("Course not found");
          return;
        }
        Database.courses[index] = { ...Database.courses[index],
          ...req.body };
        res.json(200);
      });
    
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        console.log(id);
        Database.courses = Database.courses
          .filter((c) => c._id !== id);
          console.log(Database.courses);
        res.send(Database.courses);
      });
    
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
          _id: new Date().getTime().toString() };
        Database.courses.unshift(course);
        res.send(course);
      });
    
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });
}
export default CourseRoutes;