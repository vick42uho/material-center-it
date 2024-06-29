/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import './program-update.css';

// Status options
const statusOptions = [
  { value: 'active', label: 'ใช้งาน' },
  { value: 'developing', label: 'อยู่ระหว่างพัฒนา' },
  { value: 'testing', label: 'ช่วงทดสอบ' },
  { value: 'inactive', label: 'ไม่ใช้งาน' },
];

export default function ProgramUpdatePage() {
  const { id_program } = useParams();
  const theme = useTheme();
  const router = useRouter();

  // State management
  const [formData, setFormData] = useState({
    name_program: '',
    manual_program: null,
    status_program: '',
    url_program: '',
    img_program: null,
    details_program: '',
    name_dev: '',
  });

  const [existingData, setExistingData] = useState({
    manual_url: '',
    img_url: ''
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Fetch program data
  const fetchProgram = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/program/update/${id_program}`);
      setFormData({
        name_program: response.data.name_program,
        status_program: response.data.status_program,
        url_program: response.data.url_program,
        details_program: response.data.details_program,
        name_dev: response.data.name_dev,
      });
      setExistingData({
        manual_url: response.data.manual_program,
        img_url: response.data.img_program
      });
    } catch (error) {
      console.error('Error fetching program:', error);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Enhanced handleSubmit function with detailed error handling
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null); // Clear existing errors

    try {
      const data = new FormData();
      data.append('name_program', formData.name_program);
      data.append('status_program', formData.status_program);
      data.append('url_program', formData.url_program || '');
      data.append('details_program', formData.details_program || '');
      data.append('name_dev', formData.name_dev);

      if (formData.manual_program) {
        data.append('manual_program', formData.manual_program);
      }

      if (formData.img_program) {
        data.append('img_program', formData.img_program);
      }

      const response = await axios.put(
        `http://localhost:8000/program/update/${id_program}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Response:', response.data);
      router.push('/program');
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
    setFormError(null); // Clear errors on input change
  };

  // Handle file uploads
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      if (type === 'manual_program') {
        setFormData((prevState) => ({
          ...prevState,
          manual_program: file,
        }));
      } else if (type === 'img_program') {
        setFormData((prevState) => ({
          ...prevState,
          img_program: file,
        }));
      }
      setFormError(null); // Clear errors on file upload
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      {/* Left Side */}
      <Box sx={{ flex: 1, p: 3 }}>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, md: 24 },
            left: { xs: 16, md: 24 },
          }}
        />
        <br /><br /><br /><br />

        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <Card sx={{ p: 5, width: 1, maxWidth: 640 }}>
            <Typography variant="h4">แก้ไขโปรแกรม</Typography>

            <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
              กลับไปยังรายการโปรแกรม
              <Link to="/program" component={Link} variant="subtitle2" sx={{ ml: 0.5 }}>
                กดที่นี่
              </Link>
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack direction="column" spacing={2}>
                <TextField
                  name="name_program"
                  label="ชื่อโปรแกรม"
                  value={formData.name_program}
                  onChange={handleInputChange}
                  onFocus={() => setFormError(null)}
                  fullWidth
                  required
                />

                <TextField
                  name="details_program"
                  label="รายละเอียด"
                  value={formData.details_program}
                  onChange={handleInputChange}
                  onFocus={() => setFormError(null)}
                  multiline
                  rows={4}
                  fullWidth
                />

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

                <TextField
                  name="url_program"
                  label="ลิงค์ที่อยู่โปรแกรม"
                  value={formData.url_program}
                  onChange={handleInputChange}
                  onFocus={() => setFormError(null)}
                  fullWidth
                />

                <TextField
                  name="name_dev"
                  label="ชื่อผู้พัฒนาโปรแกรม"
                  value={formData.name_dev}
                  onChange={handleInputChange}
                  onFocus={() => setFormError(null)}
                  fullWidth
                  required
                />

                {formError && (
                  <Typography variant="body2" color="error">
                    {formError}
                  </Typography>
                )}

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="inherit"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  บันทึก
                </LoadingButton>
              </Stack>
            </form>
          </Card>
        </Stack>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 320,
            textAlign: 'center',
          }}
        >
          

          {/* Display existing manual and image URLs */}
          {existingData.manual_url && (
            <div>
              <Typography variant="h6">เอกสารคู่มือเดิม:</Typography>
              <a href={existingData.manual_url} target="_blank" rel="noopener noreferrer">
                ดาวน์โหลดเอกสารคู่มือเดิม
              </a>
            </div>
          )}

          {existingData.img_url && (
            <div>
              <Typography variant="h6">รูปภาพเดิม:</Typography>
              <img  
              src={existingData.img_url} 
              alt="Program Image" 
              style={{ width: '100%', height: 'auto' }} 
              loading="lazy"
              />
            </div>
          )}

          <div>
            <input
              type="file"
              accept=".pdf"
              id="manual_program"
              onChange={(e) => handleFileUpload(e, 'manual_program')}
            />
            <TextField htmlFor="manual_program">
              <Button variant="contained" component="span">
                อัพโหลดคู่มือโปรแกรม
              </Button>
            </TextField>
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              id="img_program"
              onChange={(e) => handleFileUpload(e, 'img_program')}
            />
            <TextField htmlFor="img_program">
              <Button variant="contained" component="span">
                อัพโหลดรูปภาพโปรแกรม
              </Button>
            </TextField>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
