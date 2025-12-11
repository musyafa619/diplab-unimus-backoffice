import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-dashboard'),
  },
  {
    title: 'Peminjaman',
    path: '/bookings',
    icon: icon('ic-bookings'),
  },
  {
    title: 'Alat',
    path: '/items',
    icon: icon('ic-tools'),
  },
  {
    title: 'Mahasiswa',
    path: '/students',
    icon: icon('ic-students'),
  },
  {
    title: 'Jurusan',
    path: '/majors',
    icon: icon('ic-majors'),
  },
];
