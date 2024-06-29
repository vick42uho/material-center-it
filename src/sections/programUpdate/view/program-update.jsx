import axios from 'axios';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dropzone, FileMosaic } from '@files-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import MenuItem from '@mui/material/MenuItem';
import { Box, Card, Grid, Button, TextField, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

// Status options
const statusOptions = [
  { value: 'ใช้งาน', label: 'ใช้งาน' },
  { value: 'อยู่ระหว่างพัฒนา', label: 'อยู่ระหว่างพัฒนา' },
  { value: 'ช่วงทดสอบ', label: 'ช่วงทดสอบ' },
  { value: 'ไม่ใช้งาน', label: 'ไม่ใช้งาน' },
];

export default function ProgramUpdatePage() {
  const { id_program } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name_program: '',
    manual_program: null,
    status_program: '',
    url_program: '',
    img_program: null,
    details_program: '',
    name_dev: ''
  });

  const [existingData, setExistingData] = useState({
    manual_url: '',
    img_url: ''
  });

  const [manualFiles, setManualFiles] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fetching, setFetching] = useState(true);

  // Fetch program data
  const fetchProgram = async () => {
    setFetching(true); // Start loading
    try {
      const response = await axios.get(`http://18.143.102.26:9999/program/${id_program}`);

      // Set form data
      setFormData({
        name_program: response.data.name_program,
        status_program: response.data.status_program,
        url_program: response.data.url_program,
        details_program: response.data.details_program,
        name_dev: response.data.name_dev,
      });

      // Set existing data for manual and image URLs
      setExistingData({
        manual_url: response.data.manual_program,
        img_url: response.data.img_program
      });

      // Initialize files state
      setManualFiles(response.data.manual_program ? [{ id: 'existing', name: 'Existing Manual', file: null }] : []);
      setImgFiles(response.data.img_program ? [{ id: 'existing', name: 'Existing Image', file: null }] : []);

    } catch (error) {
      console.error('Error fetching program:', error);
    } finally {
      setFetching(false); // End loading
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null);

    try {
      const data = new FormData();
      data.append('name_program', formData.name_program);
      data.append('status_program', formData.status_program);
      data.append('url_program', formData.url_program || '');
      data.append('details_program', formData.details_program || '');
      data.append('name_dev', formData.name_dev);

      if (manualFiles.length > 0 && manualFiles[0].file) {
        data.append('manual_program', manualFiles[0].file);
      }

      if (imgFiles.length > 0 && imgFiles[0].file) {
        data.append('img_program', imgFiles[0].file);
      }

      const response = await axios.put(
        `http://18.143.102.26:9999/program/update/${id_program}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      navigate('/program');
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.response) {
        console.error('Error response:', error.response);

        if (error.response.status === 422) {
          setFormError(
            `Validation error: ${error.response.data.message || 'Check the input data.'}`
          );
        } else if (error.response.status === 500) {
          setFormError(
            'Server error: An error occurred on the server. Please try again later.'
          );
        } else if (error.response.status === 403) {
          setFormError('Access Denied: You are not authorized to perform this action.');
        } else {
          setFormError(`Error: ${error.response.data.message || 'Unexpected error occurred.'}`);
        }
      } else if (error.request) {
        setFormError('Network error: Unable to reach the server. Please check your connection.');
      } else {
        setFormError(`Unexpected error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormError(null);
  };

  // Update files for manual program uploads
  const updateManualFiles = (incomingFiles) => {
    console.log("Manual files", incomingFiles);
    setManualFiles(incomingFiles);
    if (incomingFiles.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        manual_program: incomingFiles[0].file,
      }));
    }
  };

  // Update files for image program uploads
  const updateImgFiles = (incomingFiles) => {
    console.log("Image files", incomingFiles);
    setImgFiles(incomingFiles);
    if (incomingFiles.length > 0) {
      setFormData((prevState) => ({
        ...prevState,
        img_program: incomingFiles[0].file,
      }));
    }
  };

  // Remove file from manual files
  const removeManualFile = (id) => {
    const updatedFiles = manualFiles.filter((file) => file.id !== id);
    setManualFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setFormData((prevState) => ({
        ...prevState,
        manual_program: null,
      }));
    }
  };

  // Remove file from image files
  const removeImgFile = (id) => {
    const updatedFiles = imgFiles.filter((file) => file.id !== id);
    setImgFiles(updatedFiles);
    if (updatedFiles.length === 0) {
      setFormData((prevState) => ({
        ...prevState,
        img_program: null,
      }));
    }
  };

  if (fetching) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Card sx={{ p: 5, width: '100%', maxWidth: 980, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>แก้ไขโปรแกรม</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="ชื่อโปรแกรม"
                name="name_program"
                value={formData.name_program}
                onChange={handleInputChange}
                onFocus={() => setFormError(null)}
                fullWidth
                required
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                select
                name="status_program"
                label="สถานะ"
                value={formData.status_program}
                onChange={handleInputChange}
                onFocus={() => setFormError(null)}
                fullWidth
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="URL โปรแกรม"
                name="url_program"
                value={formData.url_program}
                onChange={handleInputChange}
                onFocus={() => setFormError(null)}
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="รายละเอียดโปรแกรม"
                name="details_program"
                value={formData.details_program}
                onChange={handleInputChange}
                onFocus={() => setFormError(null)}
                fullWidth
                multiline
                rows={4}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="ชื่อผู้พัฒนา"
                name="name_dev"
                value={formData.name_dev}
                onChange={handleInputChange}
                onFocus={() => setFormError(null)}
                fullWidth
                required
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>อัพโหลดคู่มือโปรแกรม (Excel, PDF)</Typography>
              <Dropzone
                onChange={updateManualFiles}
                value={manualFiles}
                accept=".xlsx, .xls, .pdf"
                style={{ border: '1px dashed #222422', padding: '20px', borderRadius: '8px' }}
              >
                {manualFiles.map((file) => (
                  <FileMosaic key={file.id} {...file} onDelete={() => removeManualFile(file.id)} info />
                ))}
              </Dropzone>
              {existingData.manual_url && (
                <a href={existingData.manual_url} target="_blank" rel="noopener noreferrer">
                  ดาวน์โหลดเอกสารคู่มือเดิม
                </a>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>อัพโหลดรูปโปรแกรม</Typography>
              <Dropzone
                onChange={updateImgFiles}
                value={imgFiles}
                accept="image/*"
                style={{ border: '1px dashed #222422', padding: '20px', borderRadius: '8px' }}
              >
                {imgFiles.map((file) => (
                  <FileMosaic key={file.id} {...file} onDelete={() => removeImgFile(file.id)} info />
                ))}
              </Dropzone>
              {existingData.img_url && (
                <img src={existingData.img_url} alt="Existing Program" style={{ maxWidth: '100%', marginTop: '10px' }} />
              )}
            </Box>
          </Grid>
        </Grid>

        {formError && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {formError}
          </Typography>
        )}

        <Grid container spacing={2} justifyContent="center">
          {/* ปุ่ม Submit */}
          <Grid item xs={6} md={4}>
            <Button
              type="submit"
              variant="contained"
              color="inherit"
              disableElevation
              fullWidth
              startIcon={<Iconify icon="eva:save-fill" />}
            >
              {loading ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
            </Button>
          </Grid>

          {/* ปุ่มกลับไปที่หน้าโปรแกรม */}
          <Grid item xs={6} md={4}>
            <Link to="/program" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                fullWidth
                startIcon={<Iconify icon="eva:arrow-right-fill" />}
              >
                ยกเลิก
              </Button>
            </Link>
          </Grid>
        </Grid>


      </form>
    </Card>
  );
}

