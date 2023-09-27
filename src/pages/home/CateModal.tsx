import React, { useRef } from 'react'
import { useCategoryStore } from '../../store/category'
import { FluentHeart } from '../../components/Icons'

const CateModal: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const categoryList = useCategoryStore((state) => state.categoryList)

  const showModal = () => {
    dialogRef.current?.showModal()
  }

  return (
    <>
      <button className="btn" onClick={showModal}>
        open modal
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-7xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">分类</h3>
          <section className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {categoryList.map((cate) => (
              <div key={cate.id} className="flex gap-1 items-center">
                <img
                  src={cate.logo}
                  alt={cate.name}
                  className="w-6 h-6 object-cover"
                />
                <span className="flex-1 truncate">{cate.name_zh}</span>
                <button className="btn btn-sm">
                  <FluentHeart />
                </button>
              </div>
            ))}
          </section>
        </div>
      </dialog>
    </>
  )
}

export default CateModal
