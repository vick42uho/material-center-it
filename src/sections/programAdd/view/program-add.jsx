import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dropzone, FileMosaic } from '@files-ui/react';

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

export default function ProgramForm() {
  const [formData, setFormData] = useState({
    name_program: '',
    manual_program: null,
    status_program: '',
    url_program: '',
    img_program: null,
    details_program: '',
    name_dev: ''
  });

  const [manualFiles, setManualFiles] = useState([]);
  const [imgFiles, setImgFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

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

      if (manualFiles.length > 0) {
        data.append('manual_program', manualFiles[0].file);
      }

      if (imgFiles.length > 0) {
        data.append('img_program', imgFiles[0].file);
      }

      const response = await axios.post('http://54.179.56.107:9999/program/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);
      navigate('/program'); // Navigate to the program list page after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);

      if (error.response) {
        console.error('Error response:', error.response);

        if (error.response.status === 422) {
          setFormError(`Validation error: ${error.response.data.message || 'Check the input data.'}`);
        } else if (error.response.status === 500) {
          setFormError('Server error: An error occurred on the server. Please try again later.');
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

  // Handle text input changes
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

  return (
    <Card sx={{ p: 5, width: '100%', maxWidth: 980, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>เพิ่มโปรแกรม</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Left Section - Text Fields */}
            <Box sx={{ mb: 2 }}>
              <TextField
                label="ชื่อโปรแกรม"
                name="name_program"
                value={formData.name_program}
                onChange={handleInputChange}
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
                fullWidth
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="รายละเอียดโปรแกรม"
                name="details_program"
                value={formData.details_program}
                onChange={handleInputChange}
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
                fullWidth
                required
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Right Section - File Uploads */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>อัพโหลดคู่มือโปรแกรม (Word, Excel, PDF)</Typography>
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
              {loading ? 'กำลังบันทึก...' : 'บันทึกโปรแกรม'}
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
