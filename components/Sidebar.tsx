'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { useRolesContext } from '@/providers/RolesProvider';

const Sidebar = () => {
  const pathname = usePathname();
const {role}=useRolesContext()
  // change
  // const role = "Teacher"

  const isActive = pathname === "/icons/add-personal.svg" || pathname.startsWith(`/icons/add-personal.svg/`);

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between  bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {sidebarLinks.map((item) => {
          36
          
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start',
                {
                  'bg-blue-1': isActive,
                }
              )}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
        {role === "Teacher" && (
          <Link
          href={"/personal-room"}
          key={"Personal Room"}
          className={cn(
            'flex gap-4 items-center p-4 rounded-lg justify-start',
            {
              'bg-blue-1': isActive,
            }
          )}
        >
          <Image
            src={"/icons/add-personal.svg"}
            alt={"Personal Room"}
            width={24}
            height={24}
          />
          <p className="text-lg font-semibold max-lg:hidden">
            {"Personal Room"}
          </p>
        </Link>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
