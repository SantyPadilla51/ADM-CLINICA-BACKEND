import Paciente from "../models/PacienteModels.js";
import Historial from "../models/HistorialModel.js";
import Examen from "../models/ExamenModels.js";

const obtenerPacientes = async (req, res) => {
  const pacientes = await Paciente.findAll({
    where: {
      doctorId: req.doctor.id,
    },
  });

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { dni } = req.params;

  const paciente = await Paciente.findAll({
    where: { dni },
  });

  const doctorIdPaciente = paciente[0].doctorId;

  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  } else {
    res.json({ paciente });
  }
};

const obtenerPacienteID = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findAll({
    where: { id },
  });

  const doctorIdPaciente = paciente[0].doctorId;

  // res.json({ Paciente: paciente[0].doctorId, doctor: req.doctor.id });
  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  } else {
    res.json({ paciente });
  }
};

const crearPaciente = async (req, res) => {
  const paciente = new Paciente(req.body);
  paciente.doctorId = req.doctor.id;

  try {
    const pacienteGuardado = await paciente.save();

    if (pacienteGuardado) {
      res.status(200).json({
        ok: true,
        msg: "Paciente Creado Correctamente",
      });
    } else {
      return res.status(403).json({
        ok: false,
        msg: "El paciente no se pudo crear correctamente",
      });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;

  const paciente = await Paciente.findOne({
    where: { id },
  });

  if (!paciente) {
    return res.status(404).json({ msg: "El paciente no existe" });
  }

  const doctorIdPaciente = paciente.doctorId;

  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  }

  try {
    const [filasActualizadas] = await Paciente.update(req.body, {
      where: { id },
    });

    if (filasActualizadas) {
      res.json({ ok: true, msg: "Paciente actualizado correctamente" });
    } else {
      res.json({ msg: "El paciente no se pudo actualizar" });
    }
  } catch (error) {
    res.json({ msg: "Ocurrio un error" });
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const paciente = await Paciente.findOne({
    where: { id },
  });

  if (!paciente) {
    return res.status(404).json({ msg: "El paciente no existe" });
  }

  const doctorIdPaciente = paciente.doctorId;

  if (doctorIdPaciente !== req.doctor.id) {
    res.json({ msg: "Accion no valida" });
  } else {
    try {
      const pacienteEliminado = await Paciente.destroy({
        where: { id },
      });
      if (pacienteEliminado) {
        res.json({ ok: true, msg: "Paciente eliminado correctamente" });
      } else {
        res.json({ msg: "El paciente no se pudo eliminar" });
      }
    } catch (error) {
      res.json({ msg: error.message });
    }
  }
};

const obtenerHistorial = async (req, res) => {
  const { id } = req.params;

  const historial = await Historial.findAll({
    where: { idPaciente: id },
  });

  if (!historial) {
    return res.json({ msg: "El paciente no existe" });
  }

  res.json({ historial });
};

const crearHistorial = async (req, res) => {
  const historial = new Historial(req.body);
  historial.idPaciente = req.params.id;

  try {
    const historialGuardado = await historial.save();

    if (historialGuardado) {
      res.json({
        ok: true,
        msg: "Consulta creada correctamente",
      });
    } else {
      return res.json({
        ok: false,
        msg: "El historial no se pudo crear correctamente",
      });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
};

const eliminarHistorial = async (req, res) => {
  const { id } = req.params;

  const historial = await Historial.findByPk(id);

  if (!historial) {
    return res.status(404).json({ msg: "El historial no existe" });
  }

  try {
    const deleteConsulta = await historial.destroy();
    if (deleteConsulta) {
      res.json({ ok: true, msg: "Consulta eliminada correctamente" });
    } else {
      res.json({ msg: "El historial no se pudo eliminar" });
    }
  } catch (error) {
    res.json({ msg: "No se pudo eliminar el historial" });
  }
};

const obtenerExamenes = async (req, res) => {
  const { id } = req.params;

  const examenes = await Examen.findAll({
    where: { idPaciente: id },
  });

  if (!examenes) {
    return res.status(404).json({ msg: "El paciente no existe" });
  }

  res.json({ examenes });
};

export {
  obtenerPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
  obtenerPaciente,
  obtenerPacienteID,
  obtenerHistorial,
  crearHistorial,
  eliminarHistorial,
  obtenerExamenes,
};
