

-- employees
CREATE TABLE "employees" (
    "employee_id" INT   NOT NULL,
    "title_id" VARCHAR(30)   NOT NULL,
    "birth_date" DATE   NOT NULL,
    "first_name" VARCHAR(255)   NOT NULL,
    "last_name" VARCHAR(255)   NOT NULL,
    "sex" VARCHAR(10)   NOT NULL,
    "hire_date" DATE   NOT NULL,
    CONSTRAINT "pk_employees" PRIMARY KEY (
        "employee_id"
     )
);

-- departments
CREATE TABLE "departments" (
    "dept_no" VARCHAR(30)   NOT NULL,
    "dept_name" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_departments" PRIMARY KEY (
        "dept_no"
     )
);

-- department number and manager id number
CREATE TABLE "dept_manager" (
    "dept_no" VARCHAR(30)   NOT NULL,
    "employee_id" INT   NOT NULL
);

-- salaries
CREATE TABLE "salaries" (
    "employee_id" INT   NOT NULL,
    "salary" INT   NOT NULL
);

-- titles
CREATE TABLE "titles" (
    "title_id" VARCHAR(30)   NOT NULL,
    "title" VARCHAR(255)   NOT NULL,
    CONSTRAINT "pk_titles" PRIMARY KEY (
        "title_id"
     )
);

-- employee id and department
CREATE TABLE "dept_emp_junction" (
    "employee_id" INT   NOT NULL,
    "dept_no" VARCHAR(30)   NOT NULL
);



ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_employee_id" FOREIGN KEY("employee_id")
REFERENCES "employees" ("employee_id");

ALTER TABLE "salaries" ADD CONSTRAINT "fk_salaries_employee_id" FOREIGN KEY("employee_id")
REFERENCES "employees" ("employee_id");



