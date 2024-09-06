import { Department } from "../models/Department.js";

export const createDepartment = async (req, res) => {
  try {

    const { departmentName } = req.body;

    // Check for user role
    if (req.user.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    if (departmentName === "") {
      return res.status(400).json({
        message: "Please Fill details",
      });
    }

    // Check if email already exists
    let deptName = await Department.findOne({ departmentName });
    if (deptName) {
      return res.status(400).json({
        message: "This Name already exists",
      });
    }

    const insertDepartmentDetails = await Department.create({
      departmentName,
    });

    return res.status(201).json({
      message: "New Department added successful",
      status: 201,
      data: insertDepartmentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Departments = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 users per page
    const skip = (page - 1) * limit;

    // Fetch Department with pagination and excluding the password field
    const departments = await Department.find().skip(skip).limit(limit);

    // Get the total count of Department
    const totalDepartments = await Department.countDocuments();

    const totalPages = Math.ceil(totalDepartments / limit);

    return res.status(200).json({
      message: "Department List",
      status: 200,
      data: departments,
      pagination: {
        totalDepartments,
        totalPages,
        previousPage: page > 1 ? page - 1 : null,
        currentPage: page,
        nextPage: page < totalPages ? page + 1 : null,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// // single user
// export const user = async (req, res) => {
//   try {
//     if (req.user.role != "admin") {
//       return res.status(401).json({
//         message: "Unauthorized Access",
//       });
//     }

//     const id = req.params.id;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(403).json({
//         message: "Invalid User Detail",
//       });
//     }
//     const { password: userPassword, ...userDetails } = user.toObject();
//     return res.status(200).json({
//       message: "User Detail",
//       status: 200,
//       data: userDetails,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const updateUserById = async (req, res) => {
//   try {
//     if (req.user.role != "admin") {
//       return res.status(401).json({
//         message: "Unauthorized Access",
//       });
//     }

//     const id = req.params.id;
//     const user = await User.findById(id);

//     // check email already exists
//     const { email } = req.body;
//     let userEmail = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.email !== req.body.email && userEmail) {
//       return res.status(400).json({
//         message: "User Email Already Exists",
//       });
//     }

//     if (user.email !== email && userEmail) {
//       return res.status(400).json({
//         message: "User Email Already Exists",
//       });
//     }

//     Object.assign(user, req.body);
//     const image = req.file;



//     await user.save();

//     const { password, ...updatedUser } = user.toObject();
//     return res.json({
//       message: "User detail Updated successfully",
//       status: 200,
//       // data: updatedUser,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const deleteDepartment = async (req, res) => {
  try {
    if (req.user.role != "admin") {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    const id = req.params.id;

    const department = await Department.findById(id);

    if (!department) {
      return res.status(403).json({
        message: "Invalid department Detail",
      });
    }

    await department.deleteOne();

    return res.status(200).json({
      message: "Department Detail Deleted Success",
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
