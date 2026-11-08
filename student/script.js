// ===== 1. كلاس الطالب =====
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // ===== 2. دوال التحليل الأكاديمي =====
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  getGrade(average) {
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else if (average >= 50) return "E";
    else return "F";
  }

  getFinalResult() {
    const average = this.calculateAverage();
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    }
    return "يحتاج مراجعة";
  }
}

// ===== 3. مصفوفة الطلاب =====
const studentsList = [
  new Student(1001, "أحمد علي", [90, 85, 95], 90),   // متوسط 90
  new Student(1002, "سارة محمود", [45, 40, 50], 80), // متعثر (45)
  new Student(1003, "عمر خالد", [48, 44, 46], 85),   // متعثر (46)
  new Student(1004, "منى حسن", [70, 65, 60], 60),    // متوسط 65 لكن حضور ضعيف
];

// ===== 5-أ. تقرير كل طالب =====
console.log("===== تقرير الطلاب =====");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${average.toFixed(2)} | التقدير: ${student.getGrade(average)} | النتيجة: ${student.getFinalResult()}`
  );
});

// ===== 4. لجنة الرأفة =====
const MERCY_POINTS = 5;

// الاستخراج: المتوسط بين 40 و 49
const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

// المعالجة: إضافة 5 درجات (بدون تعديل الكائنات الأصلية)
const mercyStudents = strugglingStudents.map((student) => {
  const originalAverage = student.calculateAverage();
  return {
    id: student.id,
    name: student.name,
    originalAverage: originalAverage,
    newAverage: originalAverage + MERCY_POINTS,
  };
});

// التحليل: جمع المتوسطات الجديدة
const totalNewAverages = mercyStudents.reduce(
  (sum, student) => sum + student.newAverage,
  0
);

// متوسط الرأفة مع درع الحماية من القسمة على صفر
const mercyAverage =
  mercyStudents.length > 0 ? totalNewAverages / mercyStudents.length : 0;

// ===== 5-ب و 5-ج. المخرجات =====
console.log("===== الطلاب المتعثرون بعد الرأفة =====");
console.log(mercyStudents);

console.log("===== متوسط الطلاب المتعثرين بعد التعديل =====");
console.log(mercyAverage.toFixed(2));
