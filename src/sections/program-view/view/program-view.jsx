import { Icon } from '@iconify/react';
import Tilt from 'react-parallax-tilt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Wave } from "react-animated-text";
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import './program-view.css';
import AppHeaderRequest from '../app-header'; // เปลี่ยนจาก Unstable_Grid2 เป็น Grid

export default function ProgramView() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const response = await fetch('http://18.143.102.26/program');
                if (!response.ok) {
                    throw new Error('Failed to fetch programs');
                }
                const data = await response.json();
                setPrograms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    if (loading) return  <Wave text="LOADING DATA" effect="stretch" effectChange={2.2} />;
    if (error) return <Typography>Error: {error}</Typography>;

    return (
        <Container maxWidth="xl">
            <AppHeaderRequest />
            <br />
            <Box mt={2} />
            <Container sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                <Grid container spacing={3}>
                    {programs.map((program) => (
                        <Grid key={program.id_program} item xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{ minHeight: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                                <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                    {program.manual_program && (
                                        <Tooltip title="คู่มือโปรแกรม">
                                            <IconButton
                                                component="a"
                                                href={program.manual_program.replaceAll('\\', '/')}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ color: 'inherit' }}
                                            >
                                                <Icon icon="line-md:document-list" />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Box>

                                <CardContent className="card-content" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Tooltip title={program.name_program} placement="top">
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                textAlign: 'left',
                                                width: '100%',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {program.name_program.length > 20
                                                ? `${program.name_program.substring(0, 20)}...`
                                                : program.name_program}
                                        </Typography>
                                    </Tooltip>
                                    <Tilt scale={1.1} transitionSpeed={2500} tiltReverse>
                                        <Box
                                            component="a"
                                            href={program.url_program}
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
                                            {program.img_program && (
                                                <img
                                                    src={program.img_program.replaceAll('\\', '/')}
                                                    alt="ไม่มีรูปภาพ"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain',
                                                        borderRadius: 8,
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </Tilt>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'left', width: '100%' }}>
                                        <Tooltip title={program.details_program} placement="left">
                                            <Typography
                                                component='span'
                                                variant='body2'
                                                gutterBottom
                                                sx={{
                                                    textAlign: 'left',
                                                    width: '100%',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    WebkitLineClamp: 2,
                                                }}
                                            >
                                                {program.details_program}
                                            </Typography>
                                        </Tooltip>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    );
}
