<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Comentarios
 *
 * @ORM\Table(name="comentarios", indexes={@ORM\Index(name="comment_case_id", columns={"comment_case_id"}), @ORM\Index(name="comment_user_id", columns={"comment_user_id"})})
 * @ORM\Entity
 */
class Comentarios
{
    /**
     * @var integer
     *
     * @ORM\Column(name="comment_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $commentId;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="comment_created_at", type="datetime", nullable=false)
     */
    private $commentCreatedAt;

    /**
     * @var string
     *
     * @ORM\Column(name="comment_content", type="text", nullable=false)
     */
    private $commentContent;

    /**
     * @var string
     *
     * @ORM\Column(name="comment_approved", type="string", length=20, nullable=false)
     */
    private $commentApproved;

    /**
     * @var integer
     *
     * @ORM\Column(name="comment_parent", type="integer", nullable=false)
     */
    private $commentParent;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="comment_user_id", referencedColumnName="user_id")
     * })
     */
    private $commentUser;

    /**
     * @var \Casos
     *
     * @ORM\ManyToOne(targetEntity="Casos")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="comment_case_id", referencedColumnName="case_id")
     * })
     */
    private $commentCase;



    /**
     * Get commentId
     *
     * @return integer 
     */
    public function getCommentId()
    {
        return $this->commentId;
    }

    /**
     * Set commentCreatedAt
     *
     * @param \DateTime $commentCreatedAt
     * @return Comentarios
     */
    public function setCommentCreatedAt($commentCreatedAt)
    {
        $this->commentCreatedAt = $commentCreatedAt;

        return $this;
    }

    /**
     * Get commentCreatedAt
     *
     * @return \DateTime 
     */
    public function getCommentCreatedAt()
    {
        return $this->commentCreatedAt;
    }

    /**
     * Set commentContent
     *
     * @param string $commentContent
     * @return Comentarios
     */
    public function setCommentContent($commentContent)
    {
        $this->commentContent = $commentContent;

        return $this;
    }

    /**
     * Get commentContent
     *
     * @return string 
     */
    public function getCommentContent()
    {
        return $this->commentContent;
    }

    /**
     * Set commentApproved
     *
     * @param string $commentApproved
     * @return Comentarios
     */
    public function setCommentApproved($commentApproved)
    {
        $this->commentApproved = $commentApproved;

        return $this;
    }

    /**
     * Get commentApproved
     *
     * @return string 
     */
    public function getCommentApproved()
    {
        return $this->commentApproved;
    }

    /**
     * Set commentParent
     *
     * @param integer $commentParent
     * @return Comentarios
     */
    public function setCommentParent($commentParent)
    {
        $this->commentParent = $commentParent;

        return $this;
    }

    /**
     * Get commentParent
     *
     * @return integer 
     */
    public function getCommentParent()
    {
        return $this->commentParent;
    }

    /**
     * Set commentUser
     *
     * @param \AppBundle\Entity\User $commentUser
     * @return Comentarios
     */
    public function setCommentUser(\AppBundle\Entity\User $commentUser = null)
    {
        $this->commentUser = $commentUser;

        return $this;
    }

    /**
     * Get commentUser
     *
     * @return \AppBundle\Entity\User 
     */
    public function getCommentUser()
    {
        return $this->commentUser;
    }

    /**
     * Set commentCase
     *
     * @param \AppBundle\Entity\Casos $commentCase
     * @return Comentarios
     */
    public function setCommentCase(\AppBundle\Entity\Casos $commentCase = null)
    {
        $this->commentCase = $commentCase;

        return $this;
    }

    /**
     * Get commentCase
     *
     * @return \AppBundle\Entity\Casos 
     */
    public function getCommentCase()
    {
        return $this->commentCase;
    }
}
