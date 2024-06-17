import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Tilt from 'react-parallax-tilt';

import "./it-request-view.css"; // ใช้ Tilt จาก react-parallax-tilt
import { Icon } from '@iconify/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import AppHeaderRequest from '../app-header';


// ----------------------------------------------------------------------

export default function RequestView() {
    return (

        <Container maxWidth="xl">
            <AppHeaderRequest />
            <br />
            <Grid container spacing={3}>
                {/* Card 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>

                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>

                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                IT Request
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 120,
                                    }}
                                >
                                    <img
                                        src="https://img.freepik.com/free-vector/isometric-crm-illustration_52683-83950.jpg"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับขอโปรแกรมเครื่องมือ อุปกรณ์ คอมพิวเตอร์
                            </Typography>
                        </CardContent>

                    </Card>

                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                CRM
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 120,
                                    }}
                                >
                                    <img
                                        src="https://t4.ftcdn.net/jpg/02/78/01/97/360_F_278019795_HhtJsgJoL9DUoVA0l2v2EGz2YgD37sbE.jpg"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับบันทึกข้อมูลลูกค้าเก็บสถิติ

                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                Repair
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%', // Ensure it doesn't exceed its parent width
                                        height: 120, // Fixed height for the container to maintain consistency
                                    }}
                                >
                                    <img
                                        src="https://building.kku.ac.th/wp-content/uploads/2020/02/43040-Converted.png"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Keep the aspect ratio and contain within the container
                                            borderRadius: 8, // Add rounded corners if desired
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับแจ้งซ่อมต่าง ๆ ของโรงพยาบาล

                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                Store
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 120,
                                    }}
                                >
                                    <img
                                        src="https://media.istockphoto.com/id/1201117914/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B8%84%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%95%E0%B8%B9%E0%B8%99%E0%B8%A2%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B8%A2%E0%B8%B8%E0%B8%84.jpg?s=1024x1024&w=is&k=20&c=IlYu84CvW0mstwTGYp0X8hygwcpWE3ECCt14Z2uRRHk="
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับจัดการคลังสินค้า สต๊อกสินค้า คลังยาเวชภัณฑ์ ในโรงพยาบาล

                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                Service
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%', // Ensure it doesn't exceed its parent width
                                        height: 120, // Fixed height for the container to maintain consistency
                                    }}
                                >
                                    <img
                                        src="https://img.freepik.com/premium-vector/services-concept-idea-customer-support-help-clients-with-problems-assistance-providing-customer-with-valuable-information-illustration_277904-4759.jpg"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Keep the aspect ratio and contain within the container
                                            borderRadius: 8, // Add rounded corners if desired
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับบริการ 
                                
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>

                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                จองรถ
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%', // Ensure it doesn't exceed its parent width
                                        height: 120, // Fixed height for the container to maintain consistency
                                    }}
                                >
                                    <img
                                        src="https://png.pngtree.com/png-clipart/20230930/original/pngtree-efficient-transport-solutions-booking-a-taxi-carsharing-and-car-rental-made-png-image_12918687.png"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Keep the aspect ratio and contain within the container
                                            borderRadius: 8, // Add rounded corners if desired
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับจองรถ
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                {/* Card 2 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                SSB
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%',
                                        height: 120,
                                    }}
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/SSB-Logo_alt.svg/878px-SSB-Logo_alt.svg.png"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: 8,
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                สำหรับบันทึกข้องคนไข้
                                
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                {/* Card 1 */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {/* ไอคอนสำหรับลิงค์ไปหน้าคู่มือ */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                            <Tooltip title="คู่มือโปรแกรม">
                                <IconButton
                                    component="a"
                                    href="https://www.your-manual-link.com" // ใส่ URL ของหน้าคู่มือที่ต้องการ
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit' }} // ให้ไอคอนมีสีที่สอดคล้องกับธีมปัจจุบัน
                                >
                                    <Icon icon="line-md:document-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', width: '100%' }}>
                                บัญชี
                            </Typography>
                            <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                <Box
                                    component="a"
                                    href="https://www.google.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'block',
                                        marginBottom: 2,
                                        width: '100%',
                                        maxWidth: '100%', // Ensure it doesn't exceed its parent width
                                        height: 120, // Fixed height for the container to maintain consistency
                                    }}
                                >
                                    <img
                                        src="https://png.pngtree.com/png-vector/20190227/ourlarge/pngtree-accounting-conceptual-illustration-design-png-image_705522.jpg"
                                        alt="CRM Illustration"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain', // Keep the aspect ratio and contain within the container
                                            borderRadius: 8, // Add rounded corners if desired
                                        }}
                                    />
                                </Box>
                            </Tilt>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                การเงินเพื่อแก้ไขปัญหา
                                
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>





            </Grid>





        </Container>
    );
}
